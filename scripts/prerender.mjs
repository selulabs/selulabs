import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createServer } from 'vite';

const distDirectory = resolve('dist');
const server = await createServer({
  appType: 'custom',
  server: { middlewareMode: true },
});

try {
  const [{ render }, { SITE_ORIGIN, getPageMetadata, prerenderedRoutes }] = await Promise.all([
    server.ssrLoadModule('/src/entry-server.tsx'),
    server.ssrLoadModule('/src/seo.ts'),
  ]);
  const template = await readFile(resolve(distDirectory, 'index.html'), 'utf8');

  if (!template.includes('<!-- PAGE_SEO -->') || !template.includes('<div id="root"></div>')) {
    throw new Error('The built index.html is missing the SEO or app-root prerender placeholders.');
  }

  const escapeHtml = (value) =>
    value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  const createHead = (path) => {
    const metadata = getPageMetadata(path);
    const canonicalUrl = metadata.path ? `${SITE_ORIGIN}${metadata.path}` : null;
    const imageUrl = `${SITE_ORIGIN}${metadata.image}`;
    const canonical = canonicalUrl
      ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" /><meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
      : '';

    return [
      `<title>${escapeHtml(metadata.title)}</title>`,
      `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
      `<meta name="robots" content="${canonicalUrl ? 'index, follow' : 'noindex, follow'}" />`,
      canonical,
      '<meta property="og:type" content="website" />',
      `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
      `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    ].join('\n    ');
  };

  const createDocument = (path) =>
    template
      .replace('<!-- PAGE_SEO -->', createHead(path))
      .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);

  for (const { path } of prerenderedRoutes) {
    const destination = path === '/'
      ? resolve(distDirectory, 'index.html')
      : resolve(distDirectory, path.slice(1), 'index.html');
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, createDocument(path));
  }

  await writeFile(resolve(distDirectory, '404.html'), createDocument('/__not-found__'));
} finally {
  await server.close();
}

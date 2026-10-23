export interface PageMetadata {
  path: string;
  title: string;
  description: string;
  image: string;
}

export const SITE_ORIGIN = 'https://www.selulabs.com';

export const prerenderedRoutes: PageMetadata[] = [
  {
    path: '/',
    title: 'Selulabs — AI automation and software',
    description: 'Selulabs builds practical AI automation, custom software, and CRM systems for healthcare, law, and real estate teams.',
    image: '/assets/images/hero.jpeg',
  },
  {
    path: '/services',
    title: 'Services — Selulabs',
    description: 'Explore AI solutions, custom software, and CRM services from Selulabs.',
    image: '/assets/images/services.jpeg',
  },
  {
    path: '/services/ai-solutions',
    title: 'AI Solutions — Selulabs',
    description: 'Industry-aware AI automation for healthcare, law firms, and real estate teams.',
    image: '/assets/images/ai-solutions.jpeg',
  },
  {
    path: '/services/custom-software',
    title: 'Custom Software — Selulabs',
    description: 'Focused digital products and internal tools built around the way your business works.',
    image: '/assets/images/custom-software.jpeg',
  },
  {
    path: '/services/crm',
    title: 'CRM Services — Selulabs',
    description: 'Improve your CRM, connect your tools, and create a clearer path from lead to relationship.',
    image: '/assets/images/crm.jpeg',
  },
  {
    path: '/about',
    title: 'About — Selulabs',
    description: 'Meet Selulabs, a small focused team building useful AI automation and software.',
    image: '/assets/images/about.jpeg',
  },
  {
    path: '/contact',
    title: 'Contact — Selulabs',
    description: 'Talk with Selulabs about the work taking too much time or getting missed.',
    image: '/assets/images/contact.jpeg',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Selulabs',
    description: 'Read the Selulabs privacy policy in plain language.',
    image: '/assets/images/hero.jpeg',
  },
  {
    path: '/terms',
    title: 'Terms and Conditions — Selulabs',
    description: 'Read the Selulabs terms and conditions.',
    image: '/assets/images/hero.jpeg',
  },
];

const notFoundMetadata: PageMetadata = {
  path: '',
  title: 'Page not found — Selulabs',
  description: 'The page you requested could not be found.',
  image: '/assets/images/hero.jpeg',
};

export function getPageMetadata(pathname: string): PageMetadata {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return prerenderedRoutes.find(({ path }) => path === normalizedPath) ?? notFoundMetadata;
}

export function updatePageMetadata(pathname: string): void {
  const metadata = getPageMetadata(pathname);
  const canonicalUrl = metadata.path ? `${SITE_ORIGIN}${metadata.path}` : null;
  document.title = metadata.title;

  const setMeta = (attribute: 'name' | 'property', key: string, content: string): void => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.append(element);
    }
    element.content = content;
  };

  setMeta('name', 'description', metadata.description);
  setMeta('name', 'robots', canonicalUrl ? 'index, follow' : 'noindex, follow');
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:title', metadata.title);
  setMeta('property', 'og:description', metadata.description);
  setMeta('property', 'og:image', `${SITE_ORIGIN}${metadata.image}`);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', metadata.title);
  setMeta('name', 'twitter:description', metadata.description);
  setMeta('name', 'twitter:image', `${SITE_ORIGIN}${metadata.image}`);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonicalUrl) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
    setMeta('property', 'og:url', canonicalUrl);
  } else {
    canonical?.remove();
    document.head.querySelector('meta[property="og:url"]')?.remove();
  }
}

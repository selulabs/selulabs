import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';

export function render(url: string): string {
  return renderToString(
    createElement(StaticRouter, { location: url }, createElement(AppRoutes)),
  );
}

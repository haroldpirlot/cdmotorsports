export type Lang = 'fr' | 'en';

export const LANGS: Lang[] = ['fr', 'en'];
export const DEFAULT_LANG: Lang = 'fr';

export function getLangFromPath(pathname: string): Lang {
  return pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'fr';
}

export function stripLangFromPath(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

export function pathTo(path: string, lang: Lang): string {
  const normalized = path.startsWith('/') ? path : '/' + path;
  if (lang === 'fr') return normalized;
  if (normalized === '/') return '/en/';
  return '/en' + normalized;
}

export function altLangPath(pathname: string, targetLang: Lang): string {
  const base = stripLangFromPath(pathname);
  return pathTo(base, targetLang);
}

import { strings } from './strings';
export { strings };

export function t(lang: Lang) {
  return strings[lang];
}

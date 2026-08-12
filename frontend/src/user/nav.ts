import { Translation } from '@/lib/i18n';

/** Primary navigation for the customer site, shared by header and footer. */
export const NAV_LINKS: { href: string; labelKey: keyof Translation }[] = [
  { href: '/user', labelKey: 'navHome' },
  { href: '/user/products', labelKey: 'navProducts' },
  { href: '/user/about', labelKey: 'navAbout' },
  { href: '/user/contact', labelKey: 'navContactUs' },
];

export function isActiveNav(pathname: string, href: string): boolean {
  return href === '/user' ? pathname === '/user' : pathname.startsWith(href);
}

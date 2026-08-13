'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Check, Mail, MapPin, Phone } from 'lucide-react';
import { useSite } from '../site-context';
import { NAV_LINKS } from '../nav';
import { PRODUCT_CATEGORIES } from '../useProducts';
import Container from './Container';
import LanguageToggle from './LanguageToggle';

export default function UserFooter() {
  const { t, theme } = useSite();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="mt-32 border-t border-[var(--hairline)]">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5 lg:pr-12">
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl grid place-items-center overflow-hidden"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' }}
              >
                {theme.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={theme.logoUrl} alt="" className="w-full h-full object-contain p-1.5" />
                ) : (
                  <span className="font-bold text-lg">S</span>
                )}
              </span>
              <span className="u-display text-xl tracking-[0.14em] uppercase">{t('brandName')}</span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[var(--ink-muted)] max-w-sm">
              {t('footerTagline')}
            </p>

            <div className="mt-10 max-w-sm">
              <h3 className="u-eyebrow text-[var(--ink-faint)]">{t('footerNewsletterTitle')}</h3>
              <p className="mt-3 text-sm text-[var(--ink-muted)]">{t('footerNewsletterDesc')}</p>

              {isSubscribed ? (
                <p
                  className="mt-5 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: 'var(--primary-color)' }}
                  role="status"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  {t('footerSubscribed')}
                </p>
              ) : (
                <form onSubmit={onSubscribe} className="mt-5 flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t('footerEmailPlaceholder')}
                    aria-label={t('footerEmailPlaceholder')}
                    className="u-field flex-1"
                  />
                  <button type="submit" className="u-btn u-btn-primary u-btn-sm shrink-0">
                    <span className="relative z-10">{t('footerSubscribe')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          <nav className="lg:col-span-2" aria-label={t('footerNavTitle')}>
            <h3 className="u-eyebrow text-[var(--ink-faint)]">{t('footerNavTitle')}</h3>
            <ul className="mt-6 space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="u-underline text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="u-eyebrow text-[var(--ink-faint)]">{t('footerCatalogueTitle')}</h3>
            <ul className="mt-6 space-y-3.5">
              {PRODUCT_CATEGORIES.slice(0, 4).map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/user/products?category=${category.value}`}
                    className="u-underline text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-300"
                  >
                    {t(category.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="u-eyebrow text-[var(--ink-faint)]">{t('footerContactTitle')}</h3>
            <ul className="mt-6 space-y-4 text-sm text-[var(--ink-muted)]">
              <li className="flex gap-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: 'var(--primary-color)' }}
                  aria-hidden="true"
                />
                <span>{t('contactAddressValue')}</span>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: 'var(--primary-color)' }}
                  aria-hidden="true"
                />
                <a href={`tel:${t('contactPhoneValue').replace(/\s/g, '')}`} className="u-underline">
                  {t('contactPhoneValue')}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: 'var(--primary-color)' }}
                  aria-hidden="true"
                />
                <a href={`mailto:${t('contactEmailValue')}`} className="u-underline">
                  {t('contactEmailValue')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[var(--hairline)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-xs text-[var(--ink-faint)]">
            © {new Date().getFullYear()} {t('brandName')}. {t('footerRights')}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LanguageToggle />
            <Link
              href="/"
              className="text-xs font-semibold text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors duration-300"
            >
              {t('footerAdminLink')}
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-xs font-semibold text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors duration-300"
            >
              {t('backToTop')}
              <ArrowUp
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

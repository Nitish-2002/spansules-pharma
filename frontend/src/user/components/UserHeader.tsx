'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useSite } from '../site-context';
import { NAV_LINKS, isActiveNav } from '../nav';
import Container from './Container';
import LanguageToggle from './LanguageToggle';

export default function UserHeader() {
  const { t, theme, isDarkMode, toggleDarkMode } = useSite();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reading progress line under the header
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    // Next frame, so a restored scroll position is picked up too
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close the mobile drawer on navigation and lock the page behind it
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMenuOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className="relative transition-all duration-500"
        style={{
          backgroundColor: isScrolled
            ? 'color-mix(in oklab, var(--surface) 82%, transparent)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: `1px solid ${isScrolled ? 'var(--hairline)' : 'transparent'}`,
        }}
      >
        <Container size="wide">
          <div className="h-20 flex items-center justify-between gap-3 sm:gap-6">
            {/* Brand — `min-w-0` lets the long Telugu brand name truncate rather
                than shove the controls off the right edge of a phone. */}
            <Link href="/user" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
              <span
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl grid place-items-center overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' }}
              >
                {theme.logoUrl ? (
                  // Logo comes from the admin theme, so it can be any external URL
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={theme.logoUrl} alt="" className="w-full h-full object-contain p-1.5" />
                ) : (
                  <span className="font-bold text-lg">S</span>
                )}
              </span>
              <span className="leading-none min-w-0">
                <span className="block u-display text-base sm:text-xl tracking-[0.1em] sm:tracking-[0.14em] uppercase truncate">
                  {t('brandName')}
                </span>
                <span className="hidden sm:block u-eyebrow text-[10px] tracking-[0.16em] mt-1 text-[var(--ink-faint)] truncate">
                  {t('brandTagline')}
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-9" aria-label={t('menuLabel')}>
              {NAV_LINKS.map((link) => {
                const active = isActiveNav(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={active}
                    aria-current={active ? 'page' : undefined}
                    className="u-underline text-sm font-semibold transition-colors duration-300"
                    style={{ color: active ? 'var(--primary-color)' : 'var(--ink-muted)' }}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <LanguageToggle className="hidden sm:inline-flex" />

              <button
                type="button"
                onClick={toggleDarkMode}
                title={isDarkMode ? t('lightModeLabel') : t('darkModeLabel')}
                aria-label={isDarkMode ? t('lightModeLabel') : t('darkModeLabel')}
                className="w-10 h-10 shrink-0 rounded-full border border-[var(--hairline-strong)] grid place-items-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--primary-color)] transition-colors duration-300"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Link href="/user/contact" className="u-btn u-btn-primary u-btn-sm hidden md:inline-flex">
                <span className="relative z-10">{t('ctaGetQuote')}</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label={t('menuLabel')}
                className="lg:hidden w-10 h-10 shrink-0 rounded-full border border-[var(--hairline-strong)] grid place-items-center"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Container>

        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left"
          style={{ scaleX: progress, backgroundColor: 'var(--primary-color)' }}
          aria-hidden="true"
        />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'color-mix(in oklab, var(--surface) 96%, transparent)' }}
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full flex flex-col"
            >
              <Container className="flex-1 flex flex-col">
                <div className="h-20 flex items-center justify-between">
                  <span className="u-display text-xl tracking-[0.14em] uppercase">{t('brandName')}</span>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={t('closeLabel')}
                    className="w-10 h-10 rounded-full border border-[var(--hairline-strong)] grid place-items-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrolls when the viewport is short (phone in landscape) instead
                    of pushing the language/CTA row out of reach */}
                <nav className="flex-1 flex flex-col justify-center gap-2 py-6 pb-12 overflow-y-auto overscroll-contain">
                  {NAV_LINKS.map((link, index) => {
                    const active = isActiveNav(pathname, link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-baseline gap-4 py-3 border-b border-[var(--hairline)]"
                          style={{ color: active ? 'var(--primary-color)' : 'var(--ink)' }}
                        >
                          <span className="u-eyebrow u-numeral text-[var(--ink-faint)] shrink-0">
                            0{index + 1}
                          </span>
                          <span className="u-display text-3xl sm:text-4xl min-w-0">{t(link.labelKey)}</span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
                    <LanguageToggle />
                    <Link
                      href="/user/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="u-btn u-btn-primary"
                    >
                      <span className="relative z-10">{t('ctaGetQuote')}</span>
                    </Link>
                  </div>
                </nav>
              </Container>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

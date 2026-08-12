'use client';

import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { getTranslation } from '@/lib/i18n';
import { applyTheme, useActiveTheme, useDarkMode, useLanguage } from '@/lib/theme';
import { SiteProvider } from './site-context';
import UserHeader from './components/UserHeader';
import UserFooter from './components/UserFooter';

/**
 * Layout shell for the customer-facing site. It reuses the shared theme,
 * language and dark-mode state from `src/lib/theme.ts` — the very same
 * helpers the admin panel uses — and paints the admin-selected theme onto
 * CSS variables, so activating a theme in the admin restyles this site too.
 */
export default function UserShell({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { theme, isLoading } = useActiveTheme();
  const t = getTranslation(lang);

  useEffect(() => {
    applyTheme(theme, lang);
  }, [theme, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Lets the page background match the site surface (see globals.css)
  useEffect(() => {
    document.body.dataset.site = 'user';
    return () => {
      delete document.body.dataset.site;
    };
  }, []);

  return (
    <SiteProvider
      value={{
        t,
        lang,
        setLang,
        theme,
        isThemeLoading: isLoading,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      <MotionConfig reducedMotion="user">
        <div className="user-shell min-h-screen flex flex-col antialiased">
          <UserHeader />
          <main className="flex-1">{children}</main>
          <UserFooter />
        </div>
      </MotionConfig>
    </SiteProvider>
  );
}

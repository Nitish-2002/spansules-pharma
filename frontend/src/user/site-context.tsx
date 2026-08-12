'use client';

import React, { createContext, useContext } from 'react';
import { Language, Translation } from '@/lib/i18n';
import { AppTheme } from '@/lib/theme';

/**
 * Everything the customer-facing pages need from the shell: the translator,
 * the admin-configured theme and the light/dark preference. Pages are
 * separate route files, so a small context beats prop drilling here.
 */
export interface SiteContextValue {
  t: (key: keyof Translation) => string;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: AppTheme;
  isThemeLoading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({
  value,
  children,
}: {
  value: SiteContextValue;
  children: React.ReactNode;
}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite() must be used inside the user site shell');
  }
  return context;
}

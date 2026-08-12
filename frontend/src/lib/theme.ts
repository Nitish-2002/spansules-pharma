'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from './api';
import { Language } from './i18n';
import { readableInk, rgbTriplet, isLightColor } from './colors';

/**
 * Single source of truth for the theme that the admin configures on the
 * Theme page. Both the admin panel and the customer-facing site read the
 * active theme through here and paint it onto CSS custom properties, so
 * activating a theme in the admin instantly restyles every surface.
 */
export interface AppTheme {
  name?: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  logoUrl: string;
}

export const DEFAULT_THEME: AppTheme = {
  primaryColor: '#0f5132',
  secondaryColor: '#d1e7dd',
  backgroundColor: '#f8fafc',
  fontFamily: "'Outfit', sans-serif",
  logoUrl: '/images/logo.png',
};

const THEME_CACHE_KEY = 'spansules.activeTheme';
const THEME_EVENT = 'spansules:theme-changed';
const DARK_MODE_KEY = 'theme';
const LANGUAGE_KEY = 'lang';

/** Web fonts actually loaded in globals.css — anything else is ignored so a
 *  stale/unavailable `fontFamily` value can never break the typography. */
const AVAILABLE_FONTS: Record<string, string> = {
  'eb garamond': "'EB Garamond', serif",
  cabin: "'Cabin', sans-serif",
  'anek telugu': "'Anek Telugu', sans-serif",
};

export function normalizeTheme(raw: unknown): AppTheme {
  const data = (raw || {}) as Partial<AppTheme>;
  return {
    name: data.name,
    primaryColor: data.primaryColor || DEFAULT_THEME.primaryColor,
    secondaryColor: data.secondaryColor || DEFAULT_THEME.secondaryColor,
    backgroundColor: data.backgroundColor || DEFAULT_THEME.backgroundColor,
    fontFamily: data.fontFamily || DEFAULT_THEME.fontFamily,
    logoUrl: data.logoUrl || DEFAULT_THEME.logoUrl,
  };
}

/** Resolves the admin `fontFamily` value against the loaded web fonts. */
function resolveConfiguredFont(fontFamily?: string): string | null {
  if (!fontFamily) return null;
  const key = fontFamily.replace(/['"]/g, '').split(',')[0].trim().toLowerCase();
  return AVAILABLE_FONTS[key] || null;
}

/**
 * Writes the active theme + language onto the document as CSS variables.
 * Called by the admin shell and the user-site shell alike.
 */
export function applyTheme(theme: AppTheme, lang: Language) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.style.setProperty('--primary-color', theme.primaryColor);
  root.style.setProperty('--secondary-color', theme.secondaryColor);
  root.style.setProperty('--background', theme.backgroundColor);

  // Derived tokens: translucent brand tints + contrast-safe ink.
  root.style.setProperty('--primary-rgb', rgbTriplet(theme.primaryColor));
  root.style.setProperty('--secondary-rgb', rgbTriplet(theme.secondaryColor, '209 231 221'));
  root.style.setProperty('--text-on-primary', readableInk(theme.primaryColor));
  root.style.setProperty('--text-on-secondary', readableInk(theme.secondaryColor));

  // Raw admin surface/ink, consumed by the user site (which layers its own
  // dark-mode palette on top instead of overriding these globally).
  root.style.setProperty('--theme-background', theme.backgroundColor);
  root.style.setProperty('--theme-foreground', isLightColor(theme.backgroundColor) ? '#0f172a' : '#f1f5f9');

  // Typography: Telugu always uses Anek Telugu; English uses the admin font
  // when it maps to a loaded family, otherwise the project defaults.
  const configured = resolveConfiguredFont(theme.fontFamily);
  if (lang === 'te') {
    root.style.setProperty('--font-header', 'var(--font-te)');
    root.style.setProperty('--font-body', 'var(--font-te)');
    root.style.setProperty('--font-family', 'var(--font-te)');
  } else {
    root.style.setProperty('--font-header', 'var(--font-header-en)');
    root.style.setProperty('--font-body', configured || 'var(--font-body-en)');
    root.style.setProperty('--font-family', configured || 'var(--font-body-en)');
  }
}

function readCachedTheme(): AppTheme | null {
  try {
    const raw = window.localStorage.getItem(THEME_CACHE_KEY);
    return raw ? normalizeTheme(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function cacheTheme(theme: AppTheme) {
  try {
    window.localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(theme));
  } catch {
    /* storage unavailable — the theme still applies for this session */
  }
}

/**
 * Broadcasts a theme change so other open tabs (e.g. the customer site
 * running next to the admin panel) restyle immediately.
 */
export function notifyThemeChanged(theme: AppTheme) {
  if (typeof window === 'undefined') return;
  cacheTheme(theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

/**
 * Loads the active theme from the API, keeps a local cache so repeat visits
 * paint the right brand instantly, and re-syncs when the admin activates a
 * different theme (cross-tab storage event, custom event, or tab refocus).
 */
export function useActiveTheme() {
  const [theme, setTheme] = useState<AppTheme>(DEFAULT_THEME);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.getActiveTheme();
      const next = normalizeTheme(data);
      setTheme(next);
      cacheTheme(next);
    } catch {
      /* backend offline — keep the cached/default theme */
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const cached = readCachedTheme();
    if (cached) setTheme(cached);
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_CACHE_KEY) refresh();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(THEME_EVENT, refresh);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(THEME_EVENT, refresh);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [refresh]);

  return { theme, isLoading, refresh };
}

/** Light/dark surface preference, shared with the admin panel (same key). */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = window.localStorage.getItem(DARK_MODE_KEY) === 'dark';
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((current) => {
      const next = !current;
      document.documentElement.classList.toggle('dark', next);
      try {
        window.localStorage.setItem(DARK_MODE_KEY, next ? 'dark' : 'light');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { isDarkMode, toggleDarkMode };
}

/** Persisted language choice, shared with the admin panel. */
export function useLanguage() {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'te' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  return { lang, setLang };
}

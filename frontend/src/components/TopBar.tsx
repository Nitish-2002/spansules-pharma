import React from 'react';
import Link from 'next/link';
import { Menu, Sun, Moon, ExternalLink } from 'lucide-react';
import { Translation } from '@/lib/i18n';

interface TopBarProps {
  activeModule: string;
  onToggleSidebar: () => void;
  t: (key: keyof Translation) => string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function TopBar({
  activeModule,
  onToggleSidebar,
  t,
  isDarkMode,
  onToggleTheme,
}: TopBarProps) {
  return (
    <header className="h-16 sm:h-20 shrink-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2 px-3 sm:px-6 lg:px-8 shadow-sm dark:shadow-none z-20 transition-colors duration-300">
      {/* min-w-0 so a long (or Telugu) module name truncates instead of pushing
          the controls off screen */}
      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          aria-label={t('menuLabel')}
          className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="font-semibold text-sm sm:text-lg text-gray-800 dark:text-gray-200 capitalize tracking-wide truncate">
            {activeModule === 'dashboard' ? t('dashboard') : t(activeModule as any)}
          </span>
          <span className="hidden sm:inline px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-100 dark:border-emerald-500/20 shrink-0">
            Admin
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
        {/* Jump to the customer-facing site */}
        {/* Below `lg` this collapses to just the icon to keep the bar in one row */}
        <Link
          href="/user"
          title={t('viewWebsite')}
          className="flex items-center gap-2 p-2.5 lg:px-3.5 lg:py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden lg:inline">{t('viewWebsite')}</span>
        </Link>

        {/* Dark Mode Switcher Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 transition-colors cursor-pointer text-gray-700 dark:text-yellow-400"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3.5 sm:border-l border-gray-100 dark:border-slate-800 sm:pl-4 lg:pl-6">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm sm:text-base border border-emerald-100 dark:border-emerald-500/20 shadow-inner shrink-0">
            AD
          </div>
          <div className="text-left hidden xl:block">
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Admin Director</p>
            <p className="text-xs text-gray-400 dark:text-slate-400">admin@spansules.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

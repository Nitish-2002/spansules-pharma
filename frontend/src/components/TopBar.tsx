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
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 shadow-sm dark:shadow-none z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-200 capitalize tracking-wide hidden sm:inline">
            {activeModule === 'dashboard' ? t('dashboard') : t(activeModule as any)}
          </span>
          <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-100 dark:border-emerald-500/20">
            Admin
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Jump to the customer-facing site */}
        <Link
          href="/user"
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {t('viewWebsite')}
        </Link>

        {/* Dark Mode Switcher Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 transition-colors cursor-pointer text-gray-700 dark:text-yellow-400"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3.5 border-l border-gray-100 dark:border-slate-800 pl-4 sm:pl-6">
          <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-100 dark:border-emerald-500/20 shadow-inner">
            AD
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Admin Director</p>
            <p className="text-xs text-gray-400 dark:text-slate-400">admin@spansules.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

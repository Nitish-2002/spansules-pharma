'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { Translation } from '@/lib/i18n';

interface TopBarProps {
  activeModule: string;
  onToggleSidebar: () => void;
  t: (key: keyof Translation) => string;
}

export default function TopBar({ activeModule, onToggleSidebar, t }: TopBarProps) {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-base sm:text-lg text-gray-800 capitalize tracking-wide hidden sm:inline">
            {activeModule === 'dashboard' ? t('dashboard') : t(activeModule as any)}
          </span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
            Admin
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3.5 border-l border-gray-100 pl-6">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-100 shadow-inner">
            AD
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-bold text-gray-800">Admin Director</p>
            <p className="text-xs text-gray-400">admin@spansules.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

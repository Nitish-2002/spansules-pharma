'use client';

import React from 'react';
import { Globe, X } from 'lucide-react';
import { Language, Translation } from '@/lib/i18n';

interface SidebarModule {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  modules: SidebarModule[];
  activeModule: string;
  onModuleChange: (id: string) => void;
  /** Below `lg` the sidebar is an off-canvas drawer driven by this flag. */
  isDrawerOpen: boolean;
  /** From `lg` up it is a static column this flag can hide. */
  isCollapsed: boolean;
  onClose: () => void;
  onNavigate: () => void;
  theme: { logoUrl: string };
  lang: Language;
  onLangChange: (lang: Language) => void;
  t: (key: keyof Translation) => string;
}

export default function Sidebar({
  modules,
  activeModule,
  onModuleChange,
  isDrawerOpen,
  isCollapsed,
  onClose,
  onNavigate,
  theme,
  lang,
  onLangChange,
  t,
}: SidebarProps) {
  return (
    <aside
      // Width is a share of the screen on phones so the drawer never fills it
      // edge to edge, then locks to a fixed column from `lg` up.
      className={`fixed inset-y-0 left-0 z-40 w-[84%] max-w-72 flex flex-col text-white shadow-xl transition-all duration-300 transform lg:static lg:z-auto lg:w-72 lg:max-w-none lg:translate-x-0 lg:shadow-none ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        isCollapsed
          ? 'lg:-ml-72 lg:opacity-0 lg:pointer-events-none'
          : 'lg:ml-0 lg:opacity-100'
      }`}
      style={{ backgroundColor: 'var(--primary-color)' }}
      aria-hidden={!isDrawerOpen && isCollapsed ? true : undefined}
    >
      {/* Sidebar Header / Brand */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {theme.logoUrl ? (
            <img src={theme.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded bg-white p-1 shrink-0" />
          ) : (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-emerald-900 font-bold text-xl shadow-md shrink-0" style={{ color: 'var(--primary-color)' }}>
              S
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold tracking-wider truncate">SPANSULES</h1>
            <p className="text-xs text-white/70 font-medium truncate">Pharmacy Admin Panel</p>
          </div>
        </div>
        {/* Close Sidebar button */}
        <button
          onClick={onClose}
          aria-label={t('closeLabel')}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 overflow-y-auto overscroll-contain">
        {modules.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onModuleChange(item.id);
                // The drawer covers the content it just navigated to
                onNavigate();
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold text-left transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'shadow-lg translate-x-1'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--secondary-color)' : undefined,
                color: isActive ? 'var(--primary-color)' : undefined,
              }}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="min-w-0">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer with Language Switcher */}
      <div className="p-4 sm:p-6 border-t border-white/10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 text-xs text-white/80">
          <span className="flex items-center gap-1.5 font-medium min-w-0">
            <Globe className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('language')}</span>
          </span>
          <div className="flex bg-black/20 p-0.5 rounded-lg border border-white/10 shrink-0">
            <button
              onClick={() => onLangChange('en')}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${lang === 'en' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => onLangChange('te')}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${lang === 'te' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

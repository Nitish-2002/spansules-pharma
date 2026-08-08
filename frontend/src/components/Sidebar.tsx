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
  isOpen: boolean;
  onClose: () => void;
  theme: { logoUrl: string };
  lang: Language;
  onLangChange: (lang: Language) => void;
  t: (key: keyof Translation) => string;
}

export default function Sidebar({
  modules,
  activeModule,
  onModuleChange,
  isOpen,
  onClose,
  theme,
  lang,
  onLangChange,
  t,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-72 flex flex-col text-white shadow-xl transition-all duration-300 transform lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0 lg:w-72 lg:opacity-100' : '-translate-x-full lg:-ml-72 lg:opacity-0 lg:pointer-events-none'
      }`}
      style={{ backgroundColor: 'var(--primary-color)' }}
    >
      {/* Sidebar Header / Brand */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {theme.logoUrl ? (
            <img src={theme.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded bg-white p-1" />
          ) : (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-emerald-900 font-bold text-xl shadow-md" style={{ color: 'var(--primary-color)' }}>
              S
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold tracking-wider">SPANSULES</h1>
            <p className="text-xs text-white/70 font-medium">Pharmacy Admin Panel</p>
          </div>
        </div>
        {/* Close Sidebar button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {modules.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onModuleChange(item.id);
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  onClose();
                }
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'shadow-lg translate-x-1'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--secondary-color)' : undefined,
                color: isActive ? 'var(--primary-color)' : undefined,
              }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer with Language Switcher */}
      <div className="p-6 border-t border-white/10 flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs text-white/80">
          <span className="flex items-center gap-1.5 font-medium">
            <Globe className="w-4 h-4" />
            {t('language')}
          </span>
          <div className="flex bg-black/20 p-0.5 rounded-lg border border-white/10">
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

'use strict';

import React from 'react';
import { Translation } from '@/lib/i18n';
import { FormField, SubmitButton, GlassCard } from '@/components';
import { Sparkles } from 'lucide-react';

interface ThemePageProps {
  t: (key: keyof Translation) => string;
  themes: any[];
  theme: any;
  newTheme: any;
  setNewTheme: (data: any) => void;
  handleCreateTheme: (e: React.FormEvent) => void;
  handleActivateTheme: (id: string) => void;
}

export default function ThemePage({
  t,
  themes,
  theme,
  newTheme,
  setNewTheme,
  handleCreateTheme,
  handleActivateTheme,
}: ThemePageProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form to Custom Theme Creator */}
        <GlassCard className="p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            {t('themeCustomizer')}
          </h3>
          <form onSubmit={handleCreateTheme} className="space-y-4">
            <FormField label={t('themeName')}>
              <input type="text" required placeholder="e.g. Lime Forest" value={newTheme.name} onChange={e => setNewTheme({...newTheme, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('primaryColor')}>
              <div className="flex gap-2">
                <input type="color" value={newTheme.primaryColor} onChange={e => setNewTheme({...newTheme, primaryColor: e.target.value})} className="w-11 h-11 border border-gray-200 rounded-xl cursor-pointer p-1 bg-white" />
                <input type="text" value={newTheme.primaryColor} onChange={e => setNewTheme({...newTheme, primaryColor: e.target.value})} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none text-sm bg-white/50" />
              </div>
            </FormField>
            <FormField label={t('secondaryColor')}>
              <div className="flex gap-2">
                <input type="color" value={newTheme.secondaryColor} onChange={e => setNewTheme({...newTheme, secondaryColor: e.target.value})} className="w-11 h-11 border border-gray-200 rounded-xl cursor-pointer p-1 bg-white" />
                <input type="text" value={newTheme.secondaryColor} onChange={e => setNewTheme({...newTheme, secondaryColor: e.target.value})} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none text-sm bg-white/50" />
              </div>
            </FormField>
            <FormField label={t('backgroundColor')}>
              <div className="flex gap-2">
                <input type="color" value={newTheme.backgroundColor} onChange={e => setNewTheme({...newTheme, backgroundColor: e.target.value})} className="w-11 h-11 border border-gray-200 rounded-xl cursor-pointer p-1 bg-white" />
                <input type="text" value={newTheme.backgroundColor} onChange={e => setNewTheme({...newTheme, backgroundColor: e.target.value})} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none text-sm bg-white/50" />
              </div>
            </FormField>
            <FormField label={t('logoUrl')}>
              <input type="text" placeholder="https://url-to-your-logo.png" value={newTheme.logoUrl} onChange={e => setNewTheme({...newTheme, logoUrl: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <SubmitButton label={`${t('save')} Theme`} />
          </form>
        </GlassCard>

        {/* Theme Selection Board */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl">
          <h3 className="font-bold text-lg text-gray-800 mb-6">{t('activeTheme')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {themes.map((themeItem) => (
              <div key={themeItem.id} className="border border-gray-100 rounded-2xl p-5 space-y-4 hover:shadow-md transition-shadow relative bg-white/30 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800 text-sm">{themeItem.name}</span>
                  {themeItem.isActive ? (
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full" style={{ color: 'var(--primary-color)', backgroundColor: 'var(--secondary-color)' }}>{t('activeLabel')}</span>
                  ) : (
                    <button
                      onClick={() => handleActivateTheme(themeItem.id)}
                      className="px-2.5 py-0.5 bg-gray-100 hover:bg-emerald-700 hover:text-white text-[10px] text-gray-600 font-bold rounded-full transition-colors cursor-pointer"
                    >
                      {t('activateLabel')}
                    </button>
                  )}
                </div>
                {/* Colors Preview Blocks */}
                <div className="flex gap-2.5">
                  <div className="w-9 h-9 rounded-xl shadow-sm border border-gray-200/50" style={{ backgroundColor: themeItem.primaryColor }} title={t('primaryLabel')} />
                  <div className="w-9 h-9 rounded-xl shadow-sm border border-gray-200/50" style={{ backgroundColor: themeItem.secondaryColor }} title={t('secondaryLabel')} />
                  <div className="w-9 h-9 rounded-xl shadow-sm border border-gray-200/50" style={{ backgroundColor: themeItem.backgroundColor }} title={t('backgroundLabel')} />
                </div>
              </div>
            ))}

            {/* Default Fallback representation */}
            <div className="border border-emerald-100 bg-emerald-50/20 rounded-2xl p-5 space-y-4" style={{ borderColor: 'var(--secondary-color)' }}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 text-sm" style={{ color: 'var(--primary-color)' }}>{t('defaultGreenTheme')}</span>
                <span className="px-2.5 py-0.5 text-white text-[10px] font-bold rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}>{t('activeLabel')}</span>
              </div>
              <div className="flex gap-2.5">
                <div className="w-9 h-9 rounded-xl shadow bg-[#0f5132]" title={t('primaryLabel')} style={{ backgroundColor: 'var(--primary-color)' }} />
                <div className="w-9 h-9 rounded-xl shadow bg-[#d1e7dd]" title={t('secondaryLabel')} style={{ backgroundColor: 'var(--secondary-color)' }} />
                <div className="w-9 h-9 rounded-xl shadow bg-[#f8fafc] border border-gray-100" title={t('backgroundLabel')} style={{ backgroundColor: 'var(--background)' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

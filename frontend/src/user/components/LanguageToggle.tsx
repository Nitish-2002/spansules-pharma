'use client';

import { useSite } from '../site-context';

/** EN / తెలుగు switch built on the project's existing i18n language state. */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useSite();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border border-[var(--hairline-strong)] ${className}`}
      role="group"
      aria-label={t('language')}
    >
      {(['en', 'te'] as const).map((code) => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
            style={
              isActive
                ? { backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' }
                : { color: 'var(--ink-muted)' }
            }
          >
            {code === 'en' ? 'EN' : 'తెలుగు'}
          </button>
        );
      })}
    </div>
  );
}

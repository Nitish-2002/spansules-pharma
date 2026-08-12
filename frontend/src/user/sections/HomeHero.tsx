'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ShieldCheck, Truck } from 'lucide-react';
import { useSite } from '../site-context';
import Container from '../components/Container';
import ActionLink from '../components/ActionLink';
import CapsuleVisual from '../components/CapsuleVisual';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE },
});

export default function HomeHero() {
  const { t } = useSite();

  const stats: { value: string; labelKey: 'homeHeroStatYears' | 'homeHeroStatFormulations' | 'homeHeroStatMarkets' }[] = [
    { value: '27', labelKey: 'homeHeroStatYears' },
    { value: '180+', labelKey: 'homeHeroStatFormulations' },
    { value: '14', labelKey: 'homeHeroStatMarkets' },
  ];

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 pb-20 sm:pb-28">
      {/* Ambient brand light + grid, both driven by the theme colours */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="u-grid-lines absolute inset-0 opacity-70" />
        <div className="u-brand-glow absolute -top-40 -left-32 w-[38rem] h-[38rem] opacity-70" />
        <div className="u-brand-glow absolute top-1/3 -right-40 w-[30rem] h-[30rem] opacity-50" />
      </div>

      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div
              {...rise(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--hairline-strong)] pl-2.5 pr-4 py-2"
              style={{ backgroundColor: 'var(--brand-tint)' }}
            >
              <span className="relative w-2 h-2 rounded-full u-ring" style={{ backgroundColor: 'var(--primary-color)' }} />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[var(--ink-muted)]">
                {t('homeHeroEyebrow')}
              </span>
            </motion.div>

            <motion.h1 {...rise(0.08)} className="u-display u-display-xl mt-8">
              {t('homeHeroTitle')}
              <span className="u-serif-italic block" style={{ color: 'var(--primary-color)' }}>
                {t('homeHeroTitleAccent')}
              </span>
            </motion.h1>

            <motion.p {...rise(0.16)} className="u-lead mt-8 max-w-2xl">
              {t('homeHeroLead')}
            </motion.p>

            <motion.div {...rise(0.24)} className="flex flex-wrap items-center gap-3 mt-10">
              <ActionLink href="/user/products" label={t('ctaExploreProducts')} />
              <ActionLink href="/user/contact" label={t('ctaTalkToUs')} variant="ghost" withArrow={false} />
            </motion.div>

            <motion.dl
              {...rise(0.32)}
              className="mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-xl border-t border-[var(--hairline)] pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.labelKey}>
                  <dt className="u-eyebrow text-[10px] text-[var(--ink-faint)] leading-relaxed">
                    {t(stat.labelKey)}
                  </dt>
                  <dd className="u-display text-3xl sm:text-4xl mt-2">{stat.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            className="lg:col-span-5 relative"
          >
            {/* No overflow clipping — the proof chips deliberately break the frame */}
            <div className="u-panel rounded-[2.5rem] p-6 sm:p-10 relative">
              <CapsuleVisual className="w-full h-auto u-float-slow" />

              {/* Floating proof chips */}
              <div className="absolute top-6 sm:top-8 -left-3 sm:left-2 u-float" style={{ animationDelay: '0.6s' }}>
                <Chip icon={<ShieldCheck className="w-3.5 h-3.5" />} label={t('homeHeroBadgeQuality')} />
              </div>
              <div
                className="absolute bottom-8 right-0 sm:right-4 u-float"
                style={{ animationDelay: '1.4s' }}
              >
                <Chip icon={<Truck className="w-3.5 h-3.5" />} label={t('homeHeroBadgeDelivery')} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          {...rise(0.5)}
          className="hidden sm:flex items-center gap-3 mt-20 text-[var(--ink-faint)]"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" aria-hidden="true" />
          <span className="u-eyebrow text-[10px]">{t('homeScrollHint')}</span>
          <span className="h-px flex-1 max-w-40 bg-[var(--hairline)]" aria-hidden="true" />
        </motion.div>
      </Container>
    </section>
  );
}

function Chip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span
      className="flex items-center gap-2 rounded-full py-2.5 px-4 text-[11px] font-semibold shadow-lg backdrop-blur-md border border-[var(--hairline)]"
      style={{ backgroundColor: 'color-mix(in oklab, var(--surface-raised) 88%, transparent)' }}
    >
      <span style={{ color: 'var(--primary-color)' }}>{icon}</span>
      {label}
    </span>
  );
}

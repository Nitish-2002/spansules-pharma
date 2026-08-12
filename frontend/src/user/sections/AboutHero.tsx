'use client';

import { motion } from 'motion/react';
import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import Counter from '../components/Counter';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS: { value: number; suffix?: string; labelKey: keyof Translation }[] = [
  { value: 82, suffix: 'K', labelKey: 'aboutStatArea' },
  { value: 340, labelKey: 'aboutStatTeam' },
  { value: 12, labelKey: 'aboutStatLines' },
  { value: 14, labelKey: 'aboutStatCountries' },
];

export default function AboutHero() {
  const { t } = useSite();

  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20 pb-20">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="u-grid-lines absolute inset-0 opacity-60" />
        <div className="u-brand-glow absolute -top-52 right-0 w-[34rem] h-[34rem] opacity-60" />
      </div>

      <Container size="wide" className="relative">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="u-eyebrow inline-block"
          style={{ color: 'var(--primary-color)' }}
        >
          {t('aboutHeroEyebrow')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          className="u-display u-display-xl mt-6 max-w-5xl"
        >
          {t('aboutHeroTitle')}
          <span className="u-serif-italic block opacity-70">{t('aboutHeroAccent')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          className="u-lead mt-10 max-w-2xl"
        >
          {t('aboutHeroLead')}
        </motion.p>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 mt-20 border-t border-[var(--hairline)] pt-10"
        >
          {STATS.map((stat) => (
            <div key={stat.labelKey}>
              <dd className="u-display text-4xl sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="u-eyebrow text-[10px] mt-3 text-[var(--ink-faint)] leading-relaxed">
                {t(stat.labelKey)}
              </dt>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}

'use client';

import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

const MILESTONES: { year: string; titleKey: keyof Translation; descKey: keyof Translation }[] = [
  { year: '1998', titleKey: 'milestoneFoundedTitle', descKey: 'milestoneFoundedDesc' },
  { year: '2006', titleKey: 'milestoneFacilityTitle', descKey: 'milestoneFacilityDesc' },
  { year: '2013', titleKey: 'milestoneCertifiedTitle', descKey: 'milestoneCertifiedDesc' },
  { year: '2019', titleKey: 'milestoneExportTitle', descKey: 'milestoneExportDesc' },
  { year: '2024', titleKey: 'milestoneDigitalTitle', descKey: 'milestoneDigitalDesc' },
];

export default function AboutTimeline() {
  const { t } = useSite();

  return (
    <section className="py-24 sm:py-32 border-t border-[var(--hairline)]">
      <Container size="wide">
        <SectionHeading
          index="02"
          eyebrow={t('aboutTimelineEyebrow')}
          title={t('aboutTimelineTitle')}
          accent={t('aboutTimelineAccent')}
        />

        <ol className="mt-16 max-w-4xl">
          {MILESTONES.map((milestone, index) => (
            <li key={milestone.year}>
              <Reveal delay={index * 0.05}>
                <div className="group grid grid-cols-[4.5rem_1fr] sm:grid-cols-[8rem_1fr] gap-6 sm:gap-10 py-8 border-t border-[var(--hairline)] transition-colors duration-500 hover:border-[var(--primary-color)]">
                  <span
                    className="u-display u-numeral text-2xl sm:text-3xl transition-colors duration-500"
                    style={{ color: 'var(--ink-faint)' }}
                  >
                    {milestone.year}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-transform duration-500 group-hover:scale-[2.2]"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                        aria-hidden="true"
                      />
                      {t(milestone.titleKey)}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[var(--ink-muted)] max-w-xl">
                      {t(milestone.descKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

'use client';

import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { Stagger, StaggerItem } from '../components/Reveal';

const VALUES: { titleKey: keyof Translation; descKey: keyof Translation }[] = [
  { titleKey: 'valueIntegrityTitle', descKey: 'valueIntegrityDesc' },
  { titleKey: 'valuePrecisionTitle', descKey: 'valuePrecisionDesc' },
  { titleKey: 'valuePeopleTitle', descKey: 'valuePeopleDesc' },
  { titleKey: 'valueSustainabilityTitle', descKey: 'valueSustainabilityDesc' },
];

export default function AboutValues() {
  const { t } = useSite();

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-[var(--hairline)]">
      <Container size="wide">
        <SectionHeading
          index="03"
          eyebrow={t('aboutValuesEyebrow')}
          title={t('aboutValuesTitle')}
          accent={t('aboutValuesAccent')}
          lead={t('aboutValuesLead')}
        />

        {/* Hairline grid rather than cards — quieter, more editorial */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 mt-10 sm:mt-16" step={0.07}>
          {VALUES.map((value, index) => (
            <StaggerItem key={value.titleKey}>
              <div className="py-9 border-t border-[var(--hairline)] group">
                <span className="u-eyebrow u-numeral text-[var(--ink-faint)]">
                  0{index + 1}
                </span>
                <h3
                  className="u-display text-2xl mt-4 transition-colors duration-500 group-hover:text-[var(--primary-color)]"
                >
                  {t(value.titleKey)}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink-muted)]">
                  {t(value.descKey)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

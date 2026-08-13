'use client';

import { Check } from 'lucide-react';
import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { Stagger, StaggerItem } from '../components/Reveal';

const POINTS: (keyof Translation)[] = [
  'qualityPointAudits',
  'qualityPointTraceability',
  'qualityPointStability',
  'qualityPointCleanroom',
  'qualityPointDocumentation',
  'qualityPointTraining',
];

const CERTIFICATIONS: (keyof Translation)[] = [
  'certWhoGmp',
  'certIso9001',
  'certGlp',
  'certCdsco',
];

export default function AboutQuality() {
  const { t } = useSite();

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-[var(--hairline)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="04"
              eyebrow={t('aboutQualityEyebrow')}
              title={t('aboutQualityTitle')}
              accent={t('aboutQualityAccent')}
              lead={t('aboutQualityLead')}
            />

            <div className="mt-10 flex flex-wrap gap-2">
              {CERTIFICATIONS.map((key) => (
                <span
                  key={key}
                  className="u-eyebrow text-[10px] px-3.5 py-2 rounded-full border border-[var(--hairline-strong)]"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          <Stagger className="lg:col-span-7" step={0.06}>
            {POINTS.map((key) => (
              <StaggerItem key={key}>
                <div className="flex items-start gap-5 py-6 border-t border-[var(--hairline)]">
                  <span
                    className="w-7 h-7 rounded-full grid place-items-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: 'var(--brand-tint-strong)',
                      color: 'var(--primary-color)',
                    }}
                  >
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <p className="text-sm sm:text-base leading-relaxed">{t(key)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

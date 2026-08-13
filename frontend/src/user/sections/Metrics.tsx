'use client';

import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import Counter from '../components/Counter';
import { Reveal } from '../components/Reveal';

const METRICS: { value: number; suffix?: string; labelKey: keyof Translation }[] = [
  { value: 4200, suffix: '+', labelKey: 'metricBatchesLabel' },
  { value: 720, suffix: 'M', labelKey: 'metricCapacityLabel' },
  { value: 180, suffix: '', labelKey: 'metricPartnersLabel' },
  { value: 99, suffix: '%', labelKey: 'metricOnTimeLabel' },
];

export default function Metrics() {
  const { t } = useSite();

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container size="wide">
        <Reveal>
          <div
            className="rounded-[1.75rem] sm:rounded-[2.5rem] px-6 sm:px-10 lg:px-14 py-10 sm:py-16 lg:py-20 relative overflow-hidden"
            style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' }}
          >
            {/* Hairline grid, drawn in the on-primary ink */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-6">
              <div className="min-w-0">
                <span className="u-eyebrow opacity-60">{t('homeMetricsEyebrow')}</span>
                <h2 className="u-display u-display-lg mt-4">{t('homeMetricsTitle')}</h2>
              </div>
              <p className="text-xs opacity-60 lg:max-w-56">{t('homeMetricsNote')}</p>
            </div>

            <dl className="relative grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 mt-10 sm:mt-16">
              {METRICS.map((metric) => (
                <div
                  key={metric.labelKey}
                  className="border-t pt-5 sm:pt-6 min-w-0"
                  style={{ borderColor: 'color-mix(in oklab, currentColor 28%, transparent)' }}
                >
                  <dd className="u-display text-3xl sm:text-4xl lg:text-5xl">
                    <Counter value={metric.value} suffix={metric.suffix} />
                  </dd>
                  <dt className="u-eyebrow text-[10px] mt-4 opacity-70 leading-relaxed">
                    {t(metric.labelKey)}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

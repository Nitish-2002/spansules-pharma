'use client';

import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import Marquee from '../components/Marquee';

const CERTIFICATIONS: (keyof Translation)[] = [
  'certWhoGmp',
  'certIso9001',
  'certGlp',
  'certCdsco',
  'certIso14001',
  'certHaccp',
];

export default function TrustStrip() {
  const { t } = useSite();

  return (
    <section className="border-y border-[var(--hairline)]">
      <Container size="wide" className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-10 py-2">
        <span className="u-eyebrow text-[10px] text-[var(--ink-faint)] pt-6 lg:pt-0 shrink-0">
          {t('homeTrustLabel')}
        </span>
        <div className="min-w-0 flex-1">
          <Marquee items={CERTIFICATIONS.map((key) => t(key))} />
        </div>
      </Container>
    </section>
  );
}

'use client';

import { useSite } from '../site-context';
import Container from '../components/Container';
import { Reveal } from '../components/Reveal';

export default function Testimonial() {
  const { t } = useSite();

  return (
    <section className="pb-16 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal>
          <figure className="relative">
            <span
              className="u-serif-italic block text-[5rem] sm:text-[7rem] leading-none select-none"
              style={{ color: 'var(--brand-tint-strong)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="u-display text-xl sm:text-3xl lg:text-4xl leading-[1.3] sm:leading-[1.25] -mt-7 sm:-mt-14 pl-1">
              {t('homeQuote')}
            </blockquote>
            <figcaption className="mt-10 pt-6 border-t border-[var(--hairline)] flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-sm font-semibold">{t('homeQuoteAuthor')}</span>
              <span className="text-xs text-[var(--ink-faint)]">{t('homeQuoteRole')}</span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

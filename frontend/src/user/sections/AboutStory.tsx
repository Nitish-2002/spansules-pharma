'use client';

import { useSite } from '../site-context';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

export default function AboutStory() {
  const { t } = useSite();

  return (
    <section className="py-24 sm:py-32 border-t border-[var(--hairline)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky heading holds the column while the text scrolls */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                index="01"
                eyebrow={t('aboutStoryEyebrow')}
                title={t('aboutStoryTitle')}
                accent={t('aboutStoryAccent')}
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="u-dropcap text-base sm:text-lg leading-[1.75]">
                {t('aboutStoryP1')}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-base sm:text-lg leading-[1.75] mt-7 text-[var(--ink-muted)]">
                {t('aboutStoryP2')}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base sm:text-lg leading-[1.75] mt-7 text-[var(--ink-muted)]">
                {t('aboutStoryP3')}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

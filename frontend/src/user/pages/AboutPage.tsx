'use client';

import { useSite } from '../site-context';
import AboutHero from '../sections/AboutHero';
import AboutStory from '../sections/AboutStory';
import AboutTimeline from '../sections/AboutTimeline';
import AboutValues from '../sections/AboutValues';
import AboutQuality from '../sections/AboutQuality';
import CtaBand from '../sections/CtaBand';

export default function AboutPage() {
  const { t } = useSite();

  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutTimeline />
      <AboutValues />
      <AboutQuality />
      <CtaBand
        title={t('homeCtaTitle')}
        accent={t('homeCtaAccent')}
        lead={t('homeCtaLead')}
        primaryLabelKey="ctaTalkToUs"
      />
    </>
  );
}

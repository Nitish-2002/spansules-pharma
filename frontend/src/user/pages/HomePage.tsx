'use client';

import { useSite } from '../site-context';
import HomeHero from '../sections/HomeHero';
import TrustStrip from '../sections/TrustStrip';
import Capabilities from '../sections/Capabilities';
import Process from '../sections/Process';
import FeaturedProducts from '../sections/FeaturedProducts';
import Metrics from '../sections/Metrics';
import Testimonial from '../sections/Testimonial';
import CtaBand from '../sections/CtaBand';

export default function HomePage() {
  const { t } = useSite();

  return (
    <>
      <HomeHero />
      <TrustStrip />
      <Capabilities />
      <Process />
      <FeaturedProducts />
      <Metrics />
      <Testimonial />
      <CtaBand
        title={t('homeCtaTitle')}
        accent={t('homeCtaAccent')}
        lead={t('homeCtaLead')}
        secondaryHref="/user/about"
        secondaryLabelKey="ctaLearnMore"
      />
    </>
  );
}

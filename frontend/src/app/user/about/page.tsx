import type { Metadata } from 'next';
import { AboutPage } from '@/user';

export const metadata: Metadata = {
  title: 'About — Spansules',
  description:
    'Twenty-seven years of formulation, regulated manufacturing and quality assurance from a deliberately mid-sized pharmaceutical company.',
};

export default function Page() {
  return <AboutPage />;
}

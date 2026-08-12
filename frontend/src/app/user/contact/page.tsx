import type { Metadata } from 'next';
import { ContactPage } from '@/user';

export const metadata: Metadata = {
  title: 'Contact — Spansules',
  description:
    'Send a formulation brief, request a quote or ask about contract manufacturing. Enquiries reach our formulation and supply leads directly.',
};

export default function Page() {
  return <ContactPage />;
}

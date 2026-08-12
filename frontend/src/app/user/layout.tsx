import type { Metadata } from 'next';
import { UserShell } from '@/user';

export const metadata: Metadata = {
  title: 'Spansules — Pharmaceutical Formulations',
  description:
    'Oral solid dosage formulation, manufacturing and packing for healthcare brands. WHO-GMP certified facility in Hyderabad, India.',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <UserShell>{children}</UserShell>;
}

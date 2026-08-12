import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductsPage } from '@/user';
import Container from '@/user/components/Container';
import { SkeletonGrid } from '@/user/components/States';

export const metadata: Metadata = {
  title: 'Products — Spansules',
  description:
    'Browse current formulations, intermediates and materials. Availability reflects our live production store.',
};

export default function Page() {
  return (
    // ProductsPage reads the ?category= filter from the URL
    <Suspense
      fallback={
        <Container size="wide" className="py-32">
          <SkeletonGrid count={6} />
        </Container>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}

'use client';

import { PackageSearch } from 'lucide-react';
import { useSite } from '../site-context';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { TextLink } from '../components/ActionLink';
import { ProductSkeleton, StatusPanel } from '../components/States';
import { Stagger, StaggerItem } from '../components/Reveal';
import { useProducts } from '../useProducts';

/** Finished goods first — that is what a customer cares about. */
const CATEGORY_PRIORITY = ['FINISHED_GOODS', 'SEMI_FINISHED_GOODS'];

export default function FeaturedProducts() {
  const { t } = useSite();
  const { products, isLoading, hasError, reload } = useProducts();

  const featured = [...products]
    .sort((a, b) => {
      const rank = (type: string) => {
        const index = CATEGORY_PRIORITY.indexOf(type);
        return index === -1 ? CATEGORY_PRIORITY.length : index;
      };
      return rank(a.type) - rank(b.type);
    })
    .slice(0, 3);

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-[var(--hairline)]">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <SectionHeading
            index="03"
            eyebrow={t('homeFeaturedEyebrow')}
            title={t('homeFeaturedTitle')}
            accent={t('homeFeaturedAccent')}
            lead={t('homeFeaturedLead')}
          />
          <div className="lg:pb-3 shrink-0">
            <TextLink href="/user/products" label={t('ctaViewAll')} />
          </div>
        </div>

        <div className="mt-10 sm:mt-16">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : hasError ? (
            <StatusPanel
              icon={<PackageSearch className="w-6 h-6" />}
              title={t('productsErrorTitle')}
              description={t('productsErrorDesc')}
              actionLabel={t('productsRetry')}
              onAction={reload}
            />
          ) : featured.length === 0 ? (
            <StatusPanel
              icon={<PackageSearch className="w-6 h-6" />}
              title={t('productsNoteTitle')}
              description={t('productsNoteDesc')}
            />
          ) : (
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6" step={0.08}>
              {featured.map((product) => (
                <StaggerItem key={product.id} className="h-full">
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Container>
    </section>
  );
}

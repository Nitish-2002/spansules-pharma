'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PackageSearch, SearchX } from 'lucide-react';
import { useSite } from '../site-context';
import Container from '../components/Container';
import ProductFilters from '../components/ProductFilters';
import ProductCard from '../components/ProductCard';
import { SkeletonGrid, StatusPanel } from '../components/States';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal';
import ActionLink from '../components/ActionLink';
import CtaBand from '../sections/CtaBand';
import { useProducts } from '../useProducts';

export default function ProductsPage() {
  const { t } = useSite();
  const searchParams = useSearchParams();
  const { products, isLoading, hasError, reload } = useProducts();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'ALL');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'ALL' || product.type === category;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [products, search, category]);

  const isFiltered = category !== 'ALL' || search.trim().length > 0;

  const clearFilters = () => {
    setSearch('');
    setCategory('ALL');
  };

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-14 sm:pt-20 pb-14">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="u-grid-lines absolute inset-0 opacity-60" />
          <div className="u-brand-glow absolute -top-56 left-1/4 w-[32rem] h-[32rem] opacity-50" />
        </div>

        <Container size="wide" className="relative">
          <Reveal>
            <span className="u-eyebrow" style={{ color: 'var(--primary-color)' }}>
              {t('productsHeroEyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="u-display u-display-xl mt-6 max-w-4xl">
              {t('productsHeroTitle')}
              <span className="u-serif-italic block opacity-70">{t('productsHeroAccent')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="u-lead mt-8 max-w-2xl">{t('productsHeroLead')}</p>
          </Reveal>
        </Container>
      </section>

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      {/* Results */}
      <section className="py-12 sm:py-16">
        <Container size="wide">
          {!isLoading && !hasError && (
            <div className="flex items-center justify-between gap-4 mb-8">
              <p className="u-eyebrow text-[10px] text-[var(--ink-faint)]">
                <span className="u-numeral">{filtered.length}</span> {t('productsResultsSuffix')}
              </p>
              {isFiltered && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="u-underline text-xs font-semibold"
                  style={{ color: 'var(--primary-color)' }}
                >
                  {t('productsClearFilters')}
                </button>
              )}
            </div>
          )}

          {isLoading ? (
            <SkeletonGrid count={6} />
          ) : hasError ? (
            <StatusPanel
              icon={<PackageSearch className="w-6 h-6" />}
              title={t('productsErrorTitle')}
              description={t('productsErrorDesc')}
              actionLabel={t('productsRetry')}
              onAction={reload}
            />
          ) : filtered.length === 0 ? (
            <StatusPanel
              icon={<SearchX className="w-6 h-6" />}
              title={t('productsEmptyTitle')}
              description={t('productsEmptyDesc')}
              actionLabel={isFiltered ? t('productsClearFilters') : undefined}
              onAction={isFiltered ? clearFilters : undefined}
            />
          ) : (
            <Stagger
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
              step={0.05}
            >
              {filtered.map((product) => (
                <StaggerItem key={product.id} className="h-full">
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      {/* Custom brief note */}
      <section className="pb-16 sm:pb-24 lg:pb-28">
        <Container size="wide">
          <Reveal>
            <div className="u-panel rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-9 lg:p-12 flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <h2 className="u-display u-display-md">{t('productsNoteTitle')}</h2>
                <p className="u-lead mt-4 text-sm sm:text-base">{t('productsNoteDesc')}</p>
              </div>
              <ActionLink href="/user/contact" label={t('ctaGetQuote')} className="shrink-0" />
            </div>
          </Reveal>
        </Container>
      </section>

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

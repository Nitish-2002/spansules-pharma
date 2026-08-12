'use client';

import { Search, X } from 'lucide-react';
import { useSite } from '../site-context';
import { PRODUCT_CATEGORIES } from '../useProducts';
import Container from './Container';

/** Sticky search + category bar for the catalogue. */
export default function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}) {
  const { t } = useSite();

  return (
    <div
      className="sticky top-20 z-30 border-y border-[var(--hairline)]"
      style={{
        backgroundColor: 'color-mix(in oklab, var(--surface) 85%, transparent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <Container size="wide" className="py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative lg:w-80 shrink-0">
            <Search
              className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-faint)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={t('productsSearchPlaceholder')}
              aria-label={t('productsSearchPlaceholder')}
              className="u-field pl-11 pr-10 py-3 rounded-full"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label={t('closeLabel')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category chips — horizontally scrollable on small screens */}
          <div
            className="flex gap-2 overflow-x-auto lg:flex-wrap pb-1 lg:pb-0"
            role="group"
            aria-label={t('type')}
          >
            {[{ value: 'ALL', labelKey: 'productsFilterAll' as const }, ...PRODUCT_CATEGORIES].map(
              (item) => {
                const isActive = category === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onCategoryChange(item.value)}
                    aria-pressed={isActive}
                    className="whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold border transition-all duration-300"
                    style={
                      isActive
                        ? {
                            backgroundColor: 'var(--primary-color)',
                            borderColor: 'var(--primary-color)',
                            color: 'var(--text-on-primary)',
                          }
                        : { borderColor: 'var(--hairline-strong)', color: 'var(--ink-muted)' }
                    }
                  >
                    {t(item.labelKey)}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

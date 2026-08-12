'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useSite } from '../site-context';
import { Product, categoryLabelKey, stockLevel } from '../useProducts';

const STOCK_STYLES: Record<string, { dot: string; labelKey: 'productInStock' | 'productLowStock' | 'productOutOfStock' }> = {
  in: { dot: '#16a34a', labelKey: 'productInStock' },
  low: { dot: '#f59e0b', labelKey: 'productLowStock' },
  out: { dot: '#94a3b8', labelKey: 'productOutOfStock' },
};

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useSite();
  const stock = STOCK_STYLES[stockLevel(product)];

  return (
    <article className="u-panel u-panel-hover rounded-3xl p-6 sm:p-7 flex flex-col relative overflow-hidden group h-full">
      {/* Brand wash that fades in on hover */}
      <span
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'var(--brand-glow)', filter: 'blur(28px)' }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="u-eyebrow text-[var(--ink-faint)]">{t(categoryLabelKey(product.type))}</span>
        <span className="flex items-center gap-2 text-[11px] font-semibold text-[var(--ink-muted)] whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stock.dot }} />
          {t(stock.labelKey)}
        </span>
      </div>

      <h3 className="u-display text-2xl mt-6 relative">{product.name}</h3>

      <div className="flex items-center gap-4 mt-3 text-xs text-[var(--ink-faint)] relative">
        <span className="u-numeral">{product.code}</span>
        <span className="w-px h-3 bg-[var(--hairline-strong)]" aria-hidden="true" />
        <span>
          {t('productUnitLabel')} · {product.unit}
        </span>
      </div>

      {product.description && (
        <p className="mt-5 text-sm leading-relaxed text-[var(--ink-muted)] line-clamp-3 relative">
          {product.description}
        </p>
      )}

      <div className="mt-auto pt-7 relative">
        <Link
          href="/user/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
          style={{ color: 'var(--primary-color)' }}
        >
          {t('productRequestQuote')}
          <ArrowUpRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

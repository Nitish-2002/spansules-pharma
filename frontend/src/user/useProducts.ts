'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Translation } from '@/lib/i18n';

/** Catalogue item as returned by the existing `/store` endpoint. */
export interface Product {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  type: string;
  unit: string;
  quantity: number;
  minStock: number;
}

/** Catalogue categories, reusing the admin's existing category translations. */
export const PRODUCT_CATEGORIES: { value: string; labelKey: keyof Translation }[] = [
  { value: 'FINISHED_GOODS', labelKey: 'finishedGoods' },
  { value: 'SEMI_FINISHED_GOODS', labelKey: 'semiFinishedGoods' },
  { value: 'RAW_MATERIAL', labelKey: 'rawMaterial' },
  { value: 'PACKAGING', labelKey: 'packaging' },
  { value: 'STATIONARY_ITEMS', labelKey: 'stationaryItems' },
  { value: 'ENGINEERING_ITEMS', labelKey: 'engineeringItems' },
];

export function categoryLabelKey(type: string): keyof Translation {
  return PRODUCT_CATEGORIES.find((category) => category.value === type)?.labelKey ?? 'type';
}

export type StockLevel = 'in' | 'low' | 'out';

export function stockLevel(product: Product): StockLevel {
  if (!product.quantity || product.quantity <= 0) return 'out';
  if (product.minStock && product.quantity <= product.minStock) return 'low';
  return 'in';
}

/** Loads the public catalogue with loading/error states for the UI. */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // State only changes once the request settles, so the first fetch can start
  // straight from the mount effect without an extra render pass.
  const load = useCallback(async () => {
    try {
      const data = await api.getMedicines();
      setProducts(Array.isArray(data) ? data : []);
      setHasError(false);
    } catch {
      setHasError(true);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reload = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    load();
  }, [load]);

  return { products, isLoading, hasError, reload };
}

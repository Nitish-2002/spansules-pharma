import React from 'react';

/** Shimmering placeholder used while the catalogue loads. */
export function ProductSkeleton() {
  return (
    <div className="u-panel rounded-3xl p-6" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="u-skeleton h-3 w-24 rounded-full" />
        <div className="u-skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="u-skeleton h-6 w-3/4 rounded-md mt-6" />
      <div className="u-skeleton h-3 w-1/3 rounded-full mt-4" />
      <div className="u-skeleton h-3 w-full rounded-full mt-6" />
      <div className="u-skeleton h-3 w-5/6 rounded-full mt-2.5" />
      <div className="u-skeleton h-3 w-20 rounded-full mt-8" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

/** Shared empty / error panel with an optional action. */
export function StatusPanel({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="u-panel rounded-3xl px-6 sm:px-8 py-12 sm:py-16 text-center flex flex-col items-center">
      <div
        className="w-14 h-14 rounded-2xl grid place-items-center mb-6"
        style={{ backgroundColor: 'var(--brand-tint-strong)', color: 'var(--primary-color)' }}
      >
        {icon}
      </div>
      <h3 className="u-display text-2xl">{title}</h3>
      <p className="u-lead mt-3 max-w-md text-sm sm:text-base">{description}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="u-btn u-btn-ghost mt-8">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

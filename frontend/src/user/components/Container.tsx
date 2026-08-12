import React from 'react';

/** Shared horizontal rhythm for every section of the customer site. */
export default function Container({
  children,
  className = '',
  size = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}) {
  const width =
    size === 'wide' ? 'max-w-[96rem]' : size === 'narrow' ? 'max-w-3xl' : 'max-w-7xl';
  return <div className={`${width} mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

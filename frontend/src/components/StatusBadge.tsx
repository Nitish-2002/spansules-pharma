import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
}

const variantClasses: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  danger: 'bg-red-50 text-red-700 border-red-100',
  info: 'bg-blue-50 text-blue-700 border-blue-100',
  primary: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

export default function StatusBadge({ status, variant = 'primary' }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${variantClasses[variant] || variantClasses.primary}`}>
      {status}
    </span>
  );
}

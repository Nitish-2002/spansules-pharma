import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
      <div className="min-w-0">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {/* Full width when stacked so a control (e.g. a long select) never overflows */}
      {actions && <div className="w-full sm:w-auto shrink-0 [&>select]:w-full sm:[&>select]:w-auto">{actions}</div>}
    </div>
  );
}

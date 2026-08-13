import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, badge, icon }: StatCardProps) {
  return (
    <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center justify-between gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="min-w-0">
        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:tracking-widest">{label}</span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1.5 tracking-tight wrap-break-word">{value}</h3>
        {badge && <div className="mt-2">{badge}</div>}
      </div>
      {icon && <div className="shrink-0">{icon}</div>}
    </div>
  );
}

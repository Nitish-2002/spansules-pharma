import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, badge, icon }: StatCardProps) {
  return (
    <div className="glass-card p-6 rounded-3xl flex items-center justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        <h3 className="text-2xl font-bold text-gray-800 mt-1.5 tracking-tight">{value}</h3>
        {badge && <div className="mt-2">{badge}</div>}
      </div>
      {icon && <div>{icon}</div>}
    </div>
  );
}

'use client';

import React from 'react';
import { Translation } from '@/lib/i18n';
import { StatCard } from '@/components';
import {
  DollarSign,
  TrendingUp,
  Activity,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Package
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface DashboardPageProps {
  t: (key: keyof Translation) => string;
  salesAnalytics: any;
  accountsSummary: any;
  batches: any[];
  medicines: any[];
  currentChartData: any[];
}

export default function DashboardPage({
  t,
  salesAnalytics,
  accountsSummary,
  batches,
  medicines,
  currentChartData
}: DashboardPageProps) {
  return (
    <div className="space-y-5 sm:space-y-8 max-w-7.5xl mx-auto animate-fade-in">

      {/* Info Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 text-white shadow-xl premium-shadow" style={{ backgroundColor: 'var(--primary-color)' }}>
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute left-1/3 bottom-0 -translate-x-12 translate-y-12 w-64 h-64 bg-white/5 rounded-full opacity-10 blur-2xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
          <div className="min-w-0">
            <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-white/10">
              Enterprise Dashboard
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-tight">{t('welcomeTitle')}</h2>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              {t('welcomeSubtitle')}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl px-5 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl border border-white/10 text-center shadow-2xl w-full lg:w-auto lg:min-w-[220px] shrink-0">
            <span className="block text-[10px] uppercase tracking-widest font-semibold text-white/70 mb-2">{t('totalSalesRevenue')}</span>
            <span className="block text-3xl sm:text-4xl font-black text-white tracking-tight wrap-break-word">${salesAnalytics.totalSales || '525,800'}</span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label={t('payable')}
          value={`$${accountsSummary.payable?.outstanding || '85,420'}`}
          badge={
            <span className="text-[11px] text-red-600 flex items-center gap-1 font-semibold px-2 py-0.5 bg-red-50 rounded-full w-fit">
              <ArrowUpRight className="w-3 h-3" /> {t('dueThisMonth')}
            </span>
          }
          icon={<div className="p-3 sm:p-4 bg-red-50 text-red-600 rounded-2xl shadow-inner"><DollarSign className="w-5 h-5 sm:w-6 sm:h-6" /></div>}
        />
        <StatCard
          label={t('receivable')}
          value={`$${accountsSummary.receivable?.outstanding || '120,380'}`}
          badge={
            <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold px-2 py-0.5 bg-emerald-50 rounded-full w-fit">
              <ArrowDownRight className="w-3 h-3" /> {t('incomingFunds')}
            </span>
          }
          icon={<div className="p-3 sm:p-4 bg-emerald-50 text-emerald-600 rounded-2xl shadow-inner"><TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" /></div>}
        />
        <StatCard
          label={t('batches')}
          value={batches.filter(b => b.status === 'IN_PROCESS').length || '12'}
          badge={
            <span className="text-[11px] text-blue-600 flex items-center gap-1 font-semibold px-2 py-0.5 bg-blue-50 rounded-full w-fit">
              <Activity className="w-3 h-3" /> {t('inProductionLine')}
            </span>
          }
          icon={<div className="p-3 sm:p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-inner"><Layers className="w-5 h-5 sm:w-6 sm:h-6" /></div>}
        />
        <StatCard
          label={t('store')}
          value={medicines.length || '186'}
          badge={
            <span className="text-[11px] text-purple-600 flex items-center gap-1 font-semibold px-2 py-0.5 bg-purple-50 rounded-full w-fit">
              <Package className="w-3 h-3" /> {t('itemsMonitored')}
            </span>
          }
          icon={<div className="p-3 sm:p-4 bg-purple-50 text-purple-600 rounded-2xl shadow-inner"><Store className="w-5 h-5 sm:w-6 sm:h-6" /></div>}
        />
      </div>

      {/* Analytics Graph Section */}
      <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">{t('revenueTrend')}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{t('revenueTrendSubtitle')}</p>
          </div>
        </div>

        {/* Shorter on phones so the chart and its legend fit one screen */}
        <div className="h-65 sm:h-85 lg:h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary-color)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--secondary-color)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              {/* minTickGap drops labels that would collide on a narrow screen */}
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} minTickGap={28} tickMargin={8} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} width={56} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#475569' }} />
              <Area name={t('salesRevenueLabel')} type="monotone" dataKey="revenue" stroke="var(--primary-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area name={t('operatingExpensesLabel')} type="monotone" dataKey="expenses" stroke="#84cc16" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

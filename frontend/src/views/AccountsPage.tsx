'use strict';

import React, { useState } from 'react';
import { Translation } from '@/lib/i18n';
import { PageHeader, GlassCard, StatusBadge } from '@/components';

interface AccountsPageProps {
  t: (key: keyof Translation) => string;
  payables: any[];
  receivables: any[];
  accountsSummary: any;
  handlePayBill: (id: string, amount: number) => void;
  handleReceivePayment: (id: string, amount: number) => void;
}

export default function AccountsPage({
  t,
  payables,
  receivables,
  accountsSummary,
  handlePayBill,
  handleReceivePayment,
}: AccountsPageProps) {
  // Local state to control active account display filter: 'all' | 'payables' | 'receivables'
  const [filterType, setFilterType] = useState<'all' | 'payables' | 'receivables'>('all');

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">

      {/* Header and Dropdown Switcher */}
      <PageHeader
        title="Accounts Overview"
        subtitle="Filter and manage payable/receivable balances and transactions"
        actions={
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold focus:outline-none focus:border-emerald-600 text-gray-700 cursor-pointer shadow-sm"
          >
            <option value="all">Show All Accounts</option>
            <option value="payables">Show Accounts Payable Only</option>
            <option value="receivables">Show Accounts Receivable Only</option>
          </select>
        }
      />

      {/* Financial Balance Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('totalCashOutflow')}</span>
          <h3 className="text-3xl font-extrabold text-red-600 mt-2.5 tracking-tight">${accountsSummary.payable?.total || '42,500'}</h3>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500 border-t border-gray-100 pt-3">
            <span>{t('paid')}: ${accountsSummary.payable?.paid || '0'}</span>
            <span>{t('outstandingLabel')}: ${accountsSummary.payable?.outstanding || '42,500'}</span>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('totalCashInflow')}</span>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-2.5 tracking-tight">${accountsSummary.receivable?.total || '118,200'}</h3>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500 border-t border-gray-100 pt-3">
            <span>{t('received')}: ${accountsSummary.receivable?.paid || '0'}</span>
            <span>{t('outstandingLabel')}: ${accountsSummary.receivable?.outstanding || '118,200'}</span>
          </div>
        </GlassCard>
        <div className="p-6 rounded-3xl text-white shadow-xl premium-shadow" style={{ backgroundColor: 'var(--primary-color)' }}>
          <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">{t('netCashFlowBalance')}</span>
          <h3 className="text-3xl font-extrabold mt-2.5 tracking-tight">${accountsSummary.cashFlow || '75,700'}</h3>
          <p className="text-[10px] text-emerald-200/80 mt-4 font-light border-t border-white/10 pt-3 leading-relaxed">{t('cashFlowSubtitle')}</p>
        </div>
      </div>

      {/* Lists Grid Filtered dynamically */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Accounts Payable list */}
        {(filterType === 'all' || filterType === 'payables') && (
          <div className={`glass-card rounded-3xl overflow-hidden flex flex-col ${filterType === 'payables' ? 'lg:col-span-2' : ''}`}>
            <div className="p-6 border-b border-gray-100 bg-red-50/20">
              <h3 className="font-bold text-lg text-red-950">{t('payablesToVendors')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100">
                    <th className="px-6 py-4">{t('refPo')}</th>
                    <th className="px-6 py-4">Vendor</th>
                    <th className="px-6 py-4 text-right">{t('amount')}</th>
                    <th className="px-6 py-4 text-center">{t('status')}</th>
                    <th className="px-6 py-4 text-right">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {payables.map((item) => (
                    <tr key={item.id} className="hover:bg-white/40">
                      <td className="px-6 py-4.5 font-mono text-xs text-gray-400">{item.purchase?.poNumber}</td>
                      <td className="px-6 py-4.5 font-bold text-gray-800">{item.purchase?.vendor?.name}</td>
                      <td className="px-6 py-4.5 text-right font-extrabold text-gray-700">${item.amount}</td>
                      <td className="px-6 py-4.5 text-center">
                        <StatusBadge status={item.status} variant={item.status === 'PAID' ? 'success' : 'danger'} />
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        {item.status !== 'PAID' && (
                          <button
                            onClick={() => handlePayBill(item.id, item.amount - item.paidAmount)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow hover:shadow-lg cursor-pointer"
                          >
                            {t('payFull')}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {payables.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400 font-medium">{t('noPayables')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Accounts Receivable list */}
        {(filterType === 'all' || filterType === 'receivables') && (
          <div className={`glass-card rounded-3xl overflow-hidden flex flex-col ${filterType === 'receivables' ? 'lg:col-span-2' : ''}`}>
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: 'var(--secondary-color)' }}>
              <h3 className="font-bold text-lg text-emerald-950" style={{ color: 'var(--primary-color)' }}>{t('receivablesFromCustomers')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100">
                    <th className="px-6 py-4">{t('refInv')}</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4 text-right">{t('amount')}</th>
                    <th className="px-6 py-4 text-center">{t('status')}</th>
                    <th className="px-6 py-4 text-right">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {receivables.map((item) => (
                    <tr key={item.id} className="hover:bg-white/40">
                      <td className="px-6 py-4.5 font-mono text-xs text-gray-400">{item.sale?.invoiceNumber}</td>
                      <td className="px-6 py-4.5 font-bold text-gray-800">{item.sale?.customer?.name}</td>
                      <td className="px-6 py-4.5 text-right font-extrabold text-gray-700">${item.amount}</td>
                      <td className="px-6 py-4.5 text-center">
                        <StatusBadge status={item.status} variant={item.status === 'PAID' ? 'success' : 'danger'} />
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        {item.status !== 'PAID' && (
                          <button
                            onClick={() => handleReceivePayment(item.id, item.amount - item.paidAmount)}
                            className="px-3 py-1.5 text-white font-bold text-xs rounded-xl transition-all shadow hover:shadow-lg cursor-pointer"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                          >
                            {t('receive')}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {receivables.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400 font-medium">{t('noReceivables')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

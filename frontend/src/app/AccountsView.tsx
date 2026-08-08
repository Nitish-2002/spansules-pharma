'use strict';

import React from 'react';
import { Translation } from './i18n';

interface AccountsViewProps {
  t: (key: keyof Translation) => string;
  payables: any[];
  receivables: any[];
  accountsSummary: any;
  handlePayBill: (id: string, amount: number) => void;
  handleReceivePayment: (id: string, amount: number) => void;
}

export default function AccountsView({
  t,
  payables,
  receivables,
  accountsSummary,
  handlePayBill,
  handleReceivePayment,
}: AccountsViewProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Financial Balance Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('totalCashOutflow')}</span>
          <h3 className="text-3xl font-extrabold text-red-600 mt-2.5 tracking-tight">${accountsSummary.payable?.total || '42,500'}</h3>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500 border-t border-gray-100 pt-3">
            <span>{t('paid')}: ${accountsSummary.payable?.paid || '0'}</span>
            <span>{t('outstandingLabel')}: ${accountsSummary.payable?.outstanding || '42,500'}</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('totalCashInflow')}</span>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-2.5 tracking-tight">${accountsSummary.receivable?.total || '118,200'}</h3>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500 border-t border-gray-100 pt-3">
            <span>{t('received')}: ${accountsSummary.receivable?.paid || '0'}</span>
            <span>{t('outstandingLabel')}: ${accountsSummary.receivable?.outstanding || '118,200'}</span>
          </div>
        </div>
        <div className="p-6 rounded-3xl text-white shadow-xl premium-shadow" style={{ backgroundColor: 'var(--primary-color)' }}>
          <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">{t('netCashFlowBalance')}</span>
          <h3 className="text-3xl font-extrabold mt-2.5 tracking-tight">${accountsSummary.cashFlow || '75,700'}</h3>
          <p className="text-[10px] text-emerald-200/80 mt-4 font-light border-t border-white/10 pt-3 leading-relaxed">{t('cashFlowSubtitle')}</p>
        </div>
      </div>

      {/* Lists Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Accounts Payable list */}
        <div className="glass-card rounded-3xl overflow-hidden flex flex-col">
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
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {item.status}
                      </span>
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

        {/* Accounts Receivable list */}
        <div className="glass-card rounded-3xl overflow-hidden flex flex-col">
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
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`} style={{ color: item.status === 'PAID' ? 'var(--primary-color)' : undefined }}>
                        {item.status}
                      </span>
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

      </div>
    </div>
  );
}

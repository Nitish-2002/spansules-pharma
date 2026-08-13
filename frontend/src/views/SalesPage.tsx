'use strict';

import React from 'react';
import { Translation } from '@/lib/i18n';
import { FormField, SubmitButton, DataTable, GlassCard } from '@/components';
import { Plus } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SalesPageProps {
  t: (key: keyof Translation) => string;
  customers: any[];
  newCustomer: any;
  setNewCustomer: (data: any) => void;
  newSale: any;
  setNewSale: (data: any) => void;
  currentChartData: any[];
  handleCreateCustomer: (e: React.FormEvent) => void;
  handleCreateSalesOrder: (e: React.FormEvent) => void;
}

export default function SalesPage({
  t,
  customers,
  newCustomer,
  setNewCustomer,
  newSale,
  setNewSale,
  currentChartData,
  handleCreateCustomer,
  handleCreateSalesOrder,
}: SalesPageProps) {
  const customerColumns = [
    { key: 'name', label: t('name'), render: (_: any, row: any) => <span className="font-bold text-gray-800">{row.name}</span> },
    { key: 'code', label: t('code'), render: (_: any, row: any) => <span className="font-mono text-xs text-gray-400">{row.code}</span> },
    { key: 'contact', label: t('contact'), render: (_: any, row: any) => <span className="text-gray-600">{row.contact}</span> },
    { key: 'phone', label: t('phone'), render: (_: any, row: any) => <span className="text-gray-500">{row.phone}</span> },
  ];

  return (
    <div className="space-y-5 sm:space-y-8 max-w-7xl mx-auto animate-fade-in">

      {/* Top Sales Analytics Area Chart */}
      <GlassCard className="p-4 sm:p-6 lg:p-8">
        <h3 className="font-bold text-gray-800 text-lg mb-1 tracking-tight">{t('analytics')}</h3>
        <p className="text-xs text-gray-400 mb-6">Interactive revenue metrics matching pharmacy sales databases</p>
        <div className="h-55 sm:h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentChartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              {/* minTickGap drops labels that would collide on a narrow screen */}
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} minTickGap={28} tickMargin={8} />
              <YAxis stroke="#94a3b8" fontSize={11} width={56} />
              <Tooltip />
              <Legend />
              <Bar name="Sales Revenue" dataKey="revenue" fill="var(--primary-color)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
        {/* Register Customer Form */}
        <GlassCard className="p-4 sm:p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            {t('registerCustomer')}
          </h3>
          <form onSubmit={handleCreateCustomer} className="space-y-4">
            <FormField label={t('name')}>
              <input type="text" required placeholder="e.g. Apollo Pharmacy HQ" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('code')}>
              <input type="text" required placeholder="CUS-AP-801" value={newCustomer.code} onChange={e => setNewCustomer({...newCustomer, code: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('contact')}>
              <input type="text" required placeholder="Contact Person" value={newCustomer.contact} onChange={e => setNewCustomer({...newCustomer, contact: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('email')}>
              <input type="email" required placeholder="customer@domain.com" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('phone')}>
              <input type="text" required placeholder="Phone Number" value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <SubmitButton label={t('addCustomer')} />
          </form>
        </GlassCard>

        {/* Customers Table */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-8">
          <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col min-w-0">
            <div className="p-4 sm:p-6 border-b border-gray-100/80">
              <h3 className="font-bold text-lg text-gray-800">{t('customers')}</h3>
            </div>
            <DataTable columns={customerColumns} data={customers} emptyMessage={t('noCustomersRegistered')} />
          </div>

          {/* Create Sale Order */}
          <GlassCard className="p-4 sm:p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6">{t('createSaleInvoice')}</h3>
            <form onSubmit={handleCreateSalesOrder} className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
              <FormField label={t('chooseCustomer')}>
                <select value={newSale.customerId} onChange={e => setNewSale({...newSale, customerId: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none cursor-pointer">
                  <option value="">{t('chooseCustomer')}</option>
                  {customers.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
              </FormField>
              <FormField label={t('invoiceNumber')}>
                <input type="text" required placeholder="INV-2001" value={newSale.invoiceNumber} onChange={e => setNewSale({...newSale, invoiceNumber: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" />
              </FormField>
              <FormField label={t('finishedMedicineName')}>
                <input type="text" required placeholder="Paracetamol Finished Batch" value={newSale.items[0].name} onChange={e => { const items = [...newSale.items]; items[0].name = e.target.value; setNewSale({...newSale, items}); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" />
              </FormField>
              <div className="grid grid-cols-2 gap-2">
                <FormField label={t('quantity')}>
                  <input type="number" required value={newSale.items[0].quantity} onChange={e => { const items = [...newSale.items]; items[0].quantity = parseFloat(e.target.value); setNewSale({...newSale, items}); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" />
                </FormField>
                <FormField label={t('unitPrice')}>
                  <input type="number" required value={newSale.items[0].price} onChange={e => { const items = [...newSale.items]; items[0].price = parseFloat(e.target.value); setNewSale({...newSale, items}); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" />
                </FormField>
              </div>
              <button type="submit" className="py-3 text-white rounded-xl font-bold transition-all shadow hover:shadow-lg cursor-pointer sm:col-span-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                {t('submitSaleInvoice')}
              </button>
            </form>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}

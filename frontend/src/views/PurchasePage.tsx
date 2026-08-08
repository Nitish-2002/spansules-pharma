'use strict';

import React from 'react';
import { Translation } from '@/lib/i18n';
import { FormField, SubmitButton, DataTable, GlassCard } from '@/components';
import { Plus } from 'lucide-react';

interface PurchasePageProps {
  t: (key: keyof Translation) => string;
  vendors: any[];
  medicines: any[];
  newVendor: any;
  setNewVendor: (data: any) => void;
  newOrder: any;
  setNewOrder: (data: any) => void;
  handleCreateVendor: (e: React.FormEvent) => void;
  handleCreatePurchaseOrder: (e: React.FormEvent) => void;
}

export default function PurchasePage({
  t,
  vendors,
  medicines,
  newVendor,
  setNewVendor,
  newOrder,
  setNewOrder,
  handleCreateVendor,
  handleCreatePurchaseOrder,
}: PurchasePageProps) {
  const vendorColumns = [
    { key: 'name', label: t('name'), render: (_: any, row: any) => <span className="font-bold text-gray-800">{row.name}</span> },
    { key: 'code', label: t('code'), render: (_: any, row: any) => <span className="font-mono text-xs text-gray-400">{row.code}</span> },
    { key: 'contact', label: t('contact'), render: (_: any, row: any) => <span className="text-gray-600">{row.contact}</span> },
    { key: 'email', label: t('email'), render: (_: any, row: any) => <span className="text-gray-500">{row.email}</span> },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Add Vendor Form */}
        <GlassCard className="p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            {t('registerVendor')}
          </h3>
          <form onSubmit={handleCreateVendor} className="space-y-4">
            <FormField label={t('name')}>
              <input type="text" required placeholder="e.g. Aurobindo Pharma" value={newVendor.name} onChange={e => setNewVendor({...newVendor, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('code')}>
              <input type="text" required placeholder="VEN-IND-701" value={newVendor.code} onChange={e => setNewVendor({...newVendor, code: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('contact')}>
              <input type="text" required placeholder="Contact Person Name" value={newVendor.contact} onChange={e => setNewVendor({...newVendor, contact: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('email')}>
              <input type="email" required placeholder="vendor@domain.com" value={newVendor.email} onChange={e => setNewVendor({...newVendor, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('phone')}>
              <input type="text" required placeholder="Phone Number" value={newVendor.phone} onChange={e => setNewVendor({...newVendor, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <FormField label={t('address')}>
              <textarea required placeholder="Vendor physical address" value={newVendor.address} onChange={e => setNewVendor({...newVendor, address: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" />
            </FormField>
            <SubmitButton label={t('addVendor')} />
          </form>
        </GlassCard>

        {/* Vendors List & Purchase Orders */}
        <div className="lg:col-span-2 space-y-8">
          {/* Vendors List */}
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100/80 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">{t('vendors')}</h3>
            </div>
            <DataTable columns={vendorColumns} data={vendors} emptyMessage={t('noVendorsRegistered')} />
          </div>

          {/* Purchase Orders Creator */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6">{t('createPurchaseOrder')}</h3>
            <form onSubmit={handleCreatePurchaseOrder} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-end">
              <FormField label={t('chooseVendor')}>
                <select value={newOrder.vendorId} onChange={e => setNewOrder({...newOrder, vendorId: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none cursor-pointer">
                  <option value="">{t('chooseVendor')}</option>
                  {vendors.map(v => (<option key={v.id} value={v.id}>{v.name}</option>))}
                </select>
              </FormField>
              <FormField label={t('poNumber')}>
                <input type="text" required placeholder="PO-1001" value={newOrder.poNumber} onChange={e => setNewOrder({...newOrder, poNumber: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" />
              </FormField>
              <FormField label={t('chooseItem')}>
                <select value={newOrder.items[0].medicineId} onChange={e => { const items = [...newOrder.items]; items[0].medicineId = e.target.value; setNewOrder({...newOrder, items}); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none cursor-pointer">
                  <option value="">{t('chooseItem')}</option>
                  {medicines.map(m => (<option key={m.id} value={m.id}>{m.name}</option>))}
                </select>
              </FormField>
              <FormField label={t('quantity')}>
                <input type="number" required value={newOrder.items[0].quantity} onChange={e => { const items = [...newOrder.items]; items[0].quantity = parseFloat(e.target.value); setNewOrder({...newOrder, items}); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" />
              </FormField>
              <FormField label={t('unitPrice')}>
                <input type="number" required value={newOrder.items[0].price} onChange={e => { const items = [...newOrder.items]; items[0].price = parseFloat(e.target.value); setNewOrder({...newOrder, items}); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" />
              </FormField>
              <button type="submit" className="py-3 text-white rounded-xl font-bold transition-all shadow hover:shadow-lg cursor-pointer" style={{ backgroundColor: 'var(--primary-color)' }}>
                {t('submitPurchaseOrder')}
              </button>
            </form>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}

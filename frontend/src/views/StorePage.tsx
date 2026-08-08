'use strict';

import React from 'react';
import { Translation } from '@/lib/i18n';
import { FormField, SubmitButton, DataTable, GlassCard } from '@/components';
import { Plus, AlertTriangle } from 'lucide-react';

interface StorePageProps {
  t: (key: keyof Translation) => string;
  medicines: any[];
  newMedicine: any;
  setNewMedicine: (data: any) => void;
  handleCreateMedicine: (e: React.FormEvent) => void;
}

export default function StorePage({
  t,
  medicines,
  newMedicine,
  setNewMedicine,
  handleCreateMedicine,
}: StorePageProps) {
  const columns = [
    {
      key: 'name',
      label: t('name'),
      render: (_: any, row: any) => <span className="font-bold text-gray-800">{row.name}</span>,
    },
    {
      key: 'code',
      label: t('code'),
      render: (_: any, row: any) => <span className="font-mono text-xs text-gray-400">{row.code}</span>,
    },
    {
      key: 'type',
      label: t('type'),
      render: (_: any, row: any) => (
        <span className="px-3 py-1 text-xs font-bold rounded-full border" style={{ color: 'var(--primary-color)', backgroundColor: 'var(--secondary-color)', borderColor: 'rgba(15, 81, 50, 0.1)' }}>
          {row.type.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      key: 'quantity',
      label: t('quantity'),
      align: 'right' as const,
      render: (_: any, row: any) => (
        <span className={row.quantity <= row.minStock ? 'text-red-500 flex items-center justify-end gap-1.5 font-bold' : 'text-gray-700 font-semibold'}>
          {row.quantity <= row.minStock && <AlertTriangle className="w-4 h-4" />}
          {row.quantity} {row.unit}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form to Create Item */}
        <GlassCard className="p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            {t('addItemInventory')}
          </h3>
          <form onSubmit={handleCreateMedicine} className="space-y-4">
            <FormField label={t('name')}>
              <input
                type="text" required placeholder="e.g. Paracetamol Raw Powder"
                value={newMedicine.name}
                onChange={e => setNewMedicine({...newMedicine, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50"
              />
            </FormField>
            <FormField label={t('code')}>
              <input
                type="text" required placeholder="RAW-PA-101"
                value={newMedicine.code}
                onChange={e => setNewMedicine({...newMedicine, code: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50"
              />
            </FormField>
            <FormField label={t('type')}>
              <select
                value={newMedicine.type}
                onChange={e => setNewMedicine({...newMedicine, type: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white cursor-pointer"
              >
                <option value="RAW_MATERIAL">{t('rawMaterial')}</option>
                <option value="PACKAGING">{t('packaging')}</option>
                <option value="SEMI_FINISHED_GOODS">{t('semiFinishedGoods')}</option>
                <option value="FINISHED_GOODS">{t('finishedGoods')}</option>
                <option value="STATIONARY_ITEMS">{t('stationaryItems')}</option>
                <option value="ENGINEERING_ITEMS">{t('engineeringItems')}</option>
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label={t('unit')}>
                <input
                  type="text" required placeholder="kg"
                  value={newMedicine.unit}
                  onChange={e => setNewMedicine({...newMedicine, unit: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50"
                />
              </FormField>
              <FormField label={t('minStock')}>
                <input
                  type="number" required placeholder="10"
                  value={newMedicine.minStock}
                  onChange={e => setNewMedicine({...newMedicine, minStock: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50"
                />
              </FormField>
            </div>
            <SubmitButton label={t('add')} />
          </form>
        </GlassCard>

        {/* Table list of Items */}
        <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100/80 flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">{t('medicines')}</h3>
            <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-3 py-1 rounded-full">{medicines.length} {t('totalItems')}</span>
          </div>
          <DataTable columns={columns} data={medicines} emptyMessage={t('noItemsAvailable')} />
        </div>

      </div>
    </div>
  );
}

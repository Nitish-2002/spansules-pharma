'use strict';

import React from 'react';
import { Translation } from './i18n';
import { Plus, AlertTriangle } from 'lucide-react';

interface StoreViewProps {
  t: (key: keyof Translation) => string;
  medicines: any[];
  newMedicine: any;
  setNewMedicine: (data: any) => void;
  handleCreateMedicine: (e: React.FormEvent) => void;
}

export default function StoreView({
  t,
  medicines,
  newMedicine,
  setNewMedicine,
  handleCreateMedicine,
}: StoreViewProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form to Create Item */}
        <div className="glass-card p-6 rounded-3xl h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            {t('addItemInventory')}
          </h3>
          <form onSubmit={handleCreateMedicine} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('name')}</label>
              <input 
                type="text" required placeholder="e.g. Paracetamol Raw Powder"
                value={newMedicine.name} 
                onChange={e => setNewMedicine({...newMedicine, name: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('code')}</label>
              <input 
                type="text" required placeholder="RAW-PA-101"
                value={newMedicine.code} 
                onChange={e => setNewMedicine({...newMedicine, code: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('type')}</label>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('unit')}</label>
                <input 
                  type="text" required placeholder="kg"
                  value={newMedicine.unit} 
                  onChange={e => setNewMedicine({...newMedicine, unit: e.target.value})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('minStock')}</label>
                <input 
                  type="number" required placeholder="10"
                  value={newMedicine.minStock} 
                  onChange={e => setNewMedicine({...newMedicine, minStock: parseFloat(e.target.value)})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full py-3.5 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg mt-2 cursor-pointer"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {t('add')}
            </button>
          </form>
        </div>

        {/* Table list of Items */}
        <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100/80 flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">{t('medicines')}</h3>
            <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-3 py-1 rounded-full">{medicines.length} {t('totalItems')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100">
                  <th className="px-6 py-4">{t('name')}</th>
                  <th className="px-6 py-4">{t('code')}</th>
                  <th className="px-6 py-4">{t('type')}</th>
                  <th className="px-6 py-4 text-right">{t('quantity')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50 text-sm">
                {medicines.map((item) => (
                  <tr key={item.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-6 py-4.5 font-bold text-gray-800">{item.name}</td>
                    <td className="px-6 py-4.5 font-mono text-xs text-gray-400">{item.code}</td>
                    <td className="px-6 py-4.5">
                      <span className="px-3 py-1 text-xs font-bold rounded-full border" style={{ color: 'var(--primary-color)', backgroundColor: 'var(--secondary-color)', borderColor: 'rgba(15, 81, 50, 0.1)' }}>
                        {item.type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right font-semibold">
                      <span className={item.quantity <= item.minStock ? 'text-red-500 flex items-center justify-end gap-1.5 font-bold' : 'text-gray-700'}>
                        {item.quantity <= item.minStock && <AlertTriangle className="w-4 h-4" />}
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                  </tr>
                ))}
                {medicines.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-400 font-medium">{t('noItemsAvailable')}</td>
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

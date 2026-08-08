'use strict';

import React from 'react';
import { Translation } from './i18n';
import { Plus } from 'lucide-react';

interface PurchaseViewProps {
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

export default function PurchaseView({
  t,
  vendors,
  medicines,
  newVendor,
  setNewVendor,
  newOrder,
  setNewOrder,
  handleCreateVendor,
  handleCreatePurchaseOrder,
}: PurchaseViewProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Vendor Form */}
        <div className="glass-card p-6 rounded-3xl h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            {t('registerVendor')}
          </h3>
          <form onSubmit={handleCreateVendor} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('name')}</label>
              <input 
                type="text" required placeholder="e.g. Aurobindo Pharma"
                value={newVendor.name} 
                onChange={e => setNewVendor({...newVendor, name: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('code')}</label>
              <input 
                type="text" required placeholder="VEN-IND-701"
                value={newVendor.code} 
                onChange={e => setNewVendor({...newVendor, code: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('contact')}</label>
              <input 
                type="text" required placeholder="Contact Person Name"
                value={newVendor.contact} 
                onChange={e => setNewVendor({...newVendor, contact: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('email')}</label>
              <input 
                type="email" required placeholder="vendor@domain.com"
                value={newVendor.email} 
                onChange={e => setNewVendor({...newVendor, email: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('phone')}</label>
              <input 
                type="text" required placeholder="Phone Number"
                value={newVendor.phone} 
                onChange={e => setNewVendor({...newVendor, phone: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('address')}</label>
              <textarea 
                required placeholder="Vendor physical address"
                value={newVendor.address} 
                onChange={e => setNewVendor({...newVendor, address: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3.5 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg mt-2 cursor-pointer"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {t('addVendor')}
            </button>
          </form>
        </div>

        {/* Vendors List & Purchase Orders */}
        <div className="lg:col-span-2 space-y-8">
          {/* Vendors List */}
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100/80 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">{t('vendors')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100">
                    <th className="px-6 py-4">{t('name')}</th>
                    <th className="px-6 py-4">{t('code')}</th>
                    <th className="px-6 py-4">{t('contact')}</th>
                    <th className="px-6 py-4">{t('email')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50 text-sm">
                  {vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4.5 font-bold text-gray-800">{v.name}</td>
                      <td className="px-6 py-4.5 font-mono text-xs text-gray-400">{v.code}</td>
                      <td className="px-6 py-4.5 text-gray-600">{v.contact}</td>
                      <td className="px-6 py-4.5 text-gray-500">{v.email}</td>
                    </tr>
                  ))}
                  {vendors.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-gray-400 font-medium">{t('noVendorsRegistered')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Purchase Orders Creator */}
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6">{t('createPurchaseOrder')}</h3>
            <form onSubmit={handleCreatePurchaseOrder} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-end">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Select Vendor</label>
                <select 
                  value={newOrder.vendorId} 
                  onChange={e => setNewOrder({...newOrder, vendorId: e.target.value})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none cursor-pointer"
                >
                  <option value="">{t('chooseVendor')}</option>
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('poNumber')}</label>
                <input 
                  type="text" required placeholder="PO-1001"
                  value={newOrder.poNumber} 
                  onChange={e => setNewOrder({...newOrder, poNumber: e.target.value})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Raw Material</label>
                <select 
                  value={newOrder.items[0].medicineId} 
                  onChange={e => {
                    const items = [...newOrder.items];
                    items[0].medicineId = e.target.value;
                    setNewOrder({...newOrder, items});
                  }} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none cursor-pointer"
                >
                  <option value="">{t('chooseItem')}</option>
                  {medicines.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('quantity')}</label>
                <input 
                  type="number" required
                  value={newOrder.items[0].quantity} 
                  onChange={e => {
                    const items = [...newOrder.items];
                    items[0].quantity = parseFloat(e.target.value);
                    setNewOrder({...newOrder, items});
                  }} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('unitPrice')}</label>
                <input 
                  type="number" required
                  value={newOrder.items[0].price} 
                  onChange={e => {
                    const items = [...newOrder.items];
                    items[0].price = parseFloat(e.target.value);
                    setNewOrder({...newOrder, items});
                  }} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" 
                />
              </div>
              <button 
                type="submit" 
                className="py-3 text-white rounded-xl font-bold transition-all shadow hover:shadow-lg cursor-pointer"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                {t('submitPurchaseOrder')}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

'use strict';

import React from 'react';
import { Translation } from './i18n';
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

interface SalesViewProps {
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

export default function SalesView({
  t,
  customers,
  newCustomer,
  setNewCustomer,
  newSale,
  setNewSale,
  currentChartData,
  handleCreateCustomer,
  handleCreateSalesOrder,
}: SalesViewProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Top Sales Analytics Area Chart */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl">
        <h3 className="font-bold text-gray-800 text-lg mb-1 tracking-tight">{t('analytics')}</h3>
        <p className="text-xs text-gray-400 mb-6">Interactive revenue metrics matching pharmacy sales databases</p>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentChartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar name="Sales Revenue" dataKey="revenue" fill="var(--primary-color)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Register Customer Form */}
        <div className="glass-card p-6 rounded-3xl h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            {t('registerCustomer')}
          </h3>
          <form onSubmit={handleCreateCustomer} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('name')}</label>
              <input 
                type="text" required placeholder="e.g. Apollo Pharmacy HQ"
                value={newCustomer.name} 
                onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('code')}</label>
              <input 
                type="text" required placeholder="CUS-AP-801"
                value={newCustomer.code} 
                onChange={e => setNewCustomer({...newCustomer, code: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('contact')}</label>
              <input 
                type="text" required placeholder="Contact Person"
                value={newCustomer.contact} 
                onChange={e => setNewCustomer({...newCustomer, contact: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('email')}</label>
              <input 
                type="email" required placeholder="customer@domain.com"
                value={newCustomer.email} 
                onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('phone')}</label>
              <input 
                type="text" required placeholder="Phone Number"
                value={newCustomer.phone} 
                onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3.5 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg mt-2 cursor-pointer"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {t('addCustomer')}
            </button>
          </form>
        </div>

        {/* Customers Table */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100/80">
              <h3 className="font-bold text-lg text-gray-800">{t('customers')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100">
                    <th className="px-6 py-4">{t('name')}</th>
                    <th className="px-6 py-4">{t('code')}</th>
                    <th className="px-6 py-4">{t('contact')}</th>
                    <th className="px-6 py-4">{t('phone')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50 text-sm">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4.5 font-bold text-gray-800">{c.name}</td>
                      <td className="px-6 py-4.5 font-mono text-xs text-gray-400">{c.code}</td>
                      <td className="px-6 py-4.5 text-gray-600">{c.contact}</td>
                      <td className="px-6 py-4.5 text-gray-500">{c.phone}</td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-gray-400 font-medium">{t('noCustomersRegistered')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Create Sale Order */}
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6">{t('createSaleInvoice')}</h3>
            <form onSubmit={handleCreateSalesOrder} className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Select Customer</label>
                <select 
                  value={newSale.customerId} 
                  onChange={e => setNewSale({...newSale, customerId: e.target.value})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none cursor-pointer"
                >
                  <option value="">{t('chooseCustomer')}</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('invoiceNumber')}</label>
                <input 
                  type="text" required placeholder="INV-2001"
                  value={newSale.invoiceNumber} 
                  onChange={e => setNewSale({...newSale, invoiceNumber: e.target.value})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('finishedMedicineName')}</label>
                <input 
                  type="text" required placeholder="Paracetamol Finished Batch"
                  value={newSale.items[0].name} 
                  onChange={e => {
                    const items = [...newSale.items];
                    items[0].name = e.target.value;
                    setNewSale({...newSale, items});
                  }} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('quantity')}</label>
                  <input 
                    type="number" required
                    value={newSale.items[0].quantity} 
                    onChange={e => {
                      const items = [...newSale.items];
                      items[0].quantity = parseFloat(e.target.value);
                      setNewSale({...newSale, items});
                    }} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('unitPrice')}</label>
                  <input 
                    type="number" required
                    value={newSale.items[0].price} 
                    onChange={e => {
                      const items = [...newSale.items];
                      items[0].price = parseFloat(e.target.value);
                      setNewSale({...newSale, items});
                    }} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="py-3 text-white rounded-xl font-bold transition-all shadow hover:shadow-lg cursor-pointer sm:col-span-2"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                {t('submitSaleInvoice')}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

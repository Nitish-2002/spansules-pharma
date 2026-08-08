'use client';

import React, { useState, useEffect } from 'react';
import { getTranslation, Language } from './i18n';
import { api } from './api';
import { 
  LayoutDashboard, 
  Store, 
  ShoppingCart, 
  BadgePercent, 
  Activity, 
  Wallet, 
  Palette, 
  Globe, 
  Menu, 
  X 
} from 'lucide-react';

// Import sub-views
import DashboardView from './DashboardView';
import StoreView from './StoreView';
import PurchaseView from './PurchaseView';
import SalesView from './SalesView';
import ProductionView from './ProductionView';
import AccountsView from './AccountsView';
import ThemeView from './ThemeView';

export default function SpansulesDashboard() {
  const [lang, setLang] = useState<Language>('en');
  const t = getTranslation(lang);

  // Active module
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Dynamic Theme state (read from database and update CSS Custom Properties)
  const [theme, setTheme] = useState({
    primaryColor: '#0f5132',
    secondaryColor: '#d1e7dd',
    backgroundColor: '#f8fafc',
    fontFamily: "'Outfit', sans-serif",
    logoUrl: ''
  });

  // Data states
  const [themes, setThemes] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [payables, setPayables] = useState<any[]>([]);
  const [receivables, setReceivables] = useState<any[]>([]);
  const [salesAnalytics, setSalesAnalytics] = useState<any>({ chartData: [], totalSales: 0, count: 0 });
  const [accountsSummary, setAccountsSummary] = useState<any>({ payable: { total: 0, paid: 0, outstanding: 0 }, receivable: { total: 0, paid: 0, outstanding: 0 }, cashFlow: 0 });

  // Creation forms states
  const [newMedicine, setNewMedicine] = useState({ name: '', code: '', type: 'RAW_MATERIAL', unit: 'kg', quantity: 0, minStock: 10, description: '' });
  const [newVendor, setNewVendor] = useState({ name: '', code: '', contact: '', email: '', phone: '', address: '' });
  const [newCustomer, setNewCustomer] = useState({ name: '', code: '', contact: '', email: '', phone: '', address: '' });
  const [newBatch, setNewBatch] = useState({ batchNumber: '', medicineId: '', quantity: 100 });
  const [newTheme, setNewTheme] = useState({ name: '', primaryColor: '#0f5132', secondaryColor: '#d1e7dd', backgroundColor: '#f8fafc', fontFamily: "'Outfit', sans-serif", logoUrl: '' });
  
  // Transactions form states
  const [newOrder, setNewOrder] = useState({ vendorId: '', poNumber: '', orderDate: new Date().toISOString().split('T')[0], items: [{ medicineId: '', quantity: 10, price: 100 }] });
  const [newSale, setNewSale] = useState({ customerId: '', invoiceNumber: '', items: [{ name: '', quantity: 1, price: 500 }] });

  // Load backend data
  const loadData = async () => {
    try {
      const activeThemeData = await api.getActiveTheme();
      if (activeThemeData) {
        setTheme({
          primaryColor: activeThemeData.primaryColor || '#0f5132',
          secondaryColor: activeThemeData.secondaryColor || '#d1e7dd',
          backgroundColor: activeThemeData.backgroundColor || '#f8fafc',
          fontFamily: activeThemeData.fontFamily || "'Outfit', sans-serif",
          logoUrl: activeThemeData.logoUrl || ''
        });
      }

      const allThemes = await api.getThemes();
      setThemes(allThemes);

      const allMedicines = await api.getMedicines();
      setMedicines(allMedicines);

      const allVendors = await api.getVendors();
      setVendors(allVendors);

      const allCustomers = await api.getCustomers();
      setCustomers(allCustomers);

      const allBatches = await api.getBatches();
      setBatches(allBatches);

      const allPayables = await api.getAccountsPayable();
      setPayables(allPayables);

      const allReceivables = await api.getAccountsReceivable();
      setReceivables(allReceivables);

      const analytics = await api.getSalesAnalytics();
      setSalesAnalytics(analytics);

      const summary = await api.getAccountsSummary();
      setAccountsSummary(summary);
    } catch (err) {
      console.error("Error loading backend data:", err);
    }
  };

  // Sync theme choices and active language to CSS font variables globally
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--background', theme.backgroundColor);
    
    if (lang === 'te') {
      root.style.setProperty('--font-header', 'var(--font-te)');
      root.style.setProperty('--font-body', 'var(--font-te)');
      root.style.setProperty('--font-family', 'var(--font-te)');
    } else {
      root.style.setProperty('--font-header', 'var(--font-header-en)');
      root.style.setProperty('--font-body', 'var(--font-body-en)');
      root.style.setProperty('--font-family', 'var(--font-body-en)');
    }
  }, [theme, lang]);

  useEffect(() => {
    loadData();
  }, []);

  // Handlers
  const handleCreateMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createMedicine(newMedicine);
    setNewMedicine({ name: '', code: '', type: 'RAW_MATERIAL', unit: 'kg', quantity: 0, minStock: 10, description: '' });
    loadData();
  };

  const handleCreateVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createVendor(newVendor);
    setNewVendor({ name: '', code: '', contact: '', email: '', phone: '', address: '' });
    loadData();
  };

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createCustomer(newCustomer);
    setNewCustomer({ name: '', code: '', contact: '', email: '', phone: '', address: '' });
    loadData();
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createBatch(newBatch);
    setNewBatch({ batchNumber: '', medicineId: '', quantity: 100 });
    loadData();
  };

  const handleCreateTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createTheme(newTheme);
    setNewTheme({ name: '', primaryColor: '#0f5132', secondaryColor: '#d1e7dd', backgroundColor: '#f8fafc', fontFamily: "'Outfit', sans-serif", logoUrl: '' });
    loadData();
  };

  const handleActivateTheme = async (id: string) => {
    await api.activateTheme(id);
    loadData();
  };

  const handleCreatePurchaseOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createPurchaseOrder(newOrder);
    setNewOrder({ vendorId: '', poNumber: '', orderDate: new Date().toISOString().split('T')[0], items: [{ medicineId: '', quantity: 10, price: 100 }] });
    loadData();
  };

  const handleCreateSalesOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createSalesOrder(newSale);
    setNewSale({ customerId: '', invoiceNumber: '', items: [{ name: '', quantity: 1, price: 500 }] });
    loadData();
  };

  const handleUpdateStep = async (stepId: string, status: string) => {
    await api.updateBatchStep(stepId, status);
    loadData();
  };

  const handleCompleteBatch = async (batchId: string) => {
    await api.updateBatchStatus(batchId, 'COMPLETED');
    loadData();
  };

  const handlePayBill = async (id: string, amount: number) => {
    await api.payBill(id, amount);
    loadData();
  };

  const handleReceivePayment = async (id: string, amount: number) => {
    await api.receivePayment(id, amount);
    loadData();
  };

  const dummyChartData = [
    { date: '2026-08-01', revenue: 42000, expenses: 31000 },
    { date: '2026-08-02', revenue: 58000, expenses: 40000 },
    { date: '2026-08-03', revenue: 69000, expenses: 45000 },
    { date: '2026-08-04', revenue: 51000, expenses: 39000 },
    { date: '2026-08-05', revenue: 85000, expenses: 52000 },
    { date: '2026-08-06', revenue: 98000, expenses: 60000 },
    { date: '2026-08-07', revenue: 120000, expenses: 75000 },
  ];

  const currentChartData = salesAnalytics.chartData.length > 0 
    ? salesAnalytics.chartData.map((d: any) => ({ ...d, expenses: d.revenue * 0.6 })) 
    : dummyChartData;

  const sidebarModules = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'store', label: t('store'), icon: Store },
    { id: 'purchase', label: t('purchase'), icon: ShoppingCart },
    { id: 'sales', label: t('sales'), icon: BadgePercent },
    { id: 'production', label: t('production'), icon: Activity },
    { id: 'accounts', label: t('accounts'), icon: Wallet },
    { id: 'theme', label: t('theme'), icon: Palette },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)', fontFamily: 'var(--font-family)' }}>
      
      {/* SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-72 flex flex-col text-white shadow-xl transition-all duration-300 transform lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 lg:w-72 lg:opacity-100' : '-translate-x-full lg:-ml-72 lg:opacity-0 lg:pointer-events-none'
        }`} 
        style={{ backgroundColor: 'var(--primary-color)' }}
      >
        {/* Sidebar Header / Brand */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {theme.logoUrl ? (
              <img src={theme.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded" />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-emerald-900 font-bold text-xl shadow-md" style={{ color: 'var(--primary-color)' }}>
                S
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold tracking-wider">SPANSULES</h1>
              <p className="text-xs text-white/70 font-medium">Pharmacy Admin Panel</p>
            </div>
          </div>
          {/* Close Sidebar button */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarModules.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'shadow-lg translate-x-1' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ 
                  backgroundColor: isActive ? 'var(--secondary-color)' : undefined,
                  color: isActive ? 'var(--primary-color)' : undefined
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Language Switcher */}
        <div className="p-6 border-t border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-white/80">
            <span className="flex items-center gap-1.5 font-medium">
              <Globe className="w-4 h-4" />
              {t('language')}
            </span>
            <div className="flex bg-black/20 p-0.5 rounded-lg border border-white/10">
              <button 
                onClick={() => setLang('en')} 
                className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${lang === 'en' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('te')} 
                className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${lang === 'te' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/40 z-20 lg:hidden cursor-pointer"
        />
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        {/* TOP BAR */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-base sm:text-lg text-gray-800 capitalize tracking-wide hidden sm:inline">
                {activeModule === 'dashboard' ? t('dashboard') : t(activeModule as any)}
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3.5 border-l border-gray-100 pl-6">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-100 shadow-inner">
                AD
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-gray-800">Admin Director</p>
                <p className="text-xs text-gray-400">admin@spansules.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50/50">

          {activeModule === 'dashboard' && (
            <DashboardView 
              t={t}
              salesAnalytics={salesAnalytics}
              accountsSummary={accountsSummary}
              batches={batches}
              medicines={medicines}
              currentChartData={currentChartData}
            />
          )}

          {activeModule === 'store' && (
            <StoreView 
              t={t}
              medicines={medicines}
              newMedicine={newMedicine}
              setNewMedicine={setNewMedicine}
              handleCreateMedicine={handleCreateMedicine}
            />
          )}

          {activeModule === 'purchase' && (
            <PurchaseView 
              t={t}
              vendors={vendors}
              medicines={medicines}
              newVendor={newVendor}
              setNewVendor={setNewVendor}
              newOrder={newOrder}
              setNewOrder={setNewOrder}
              handleCreateVendor={handleCreateVendor}
              handleCreatePurchaseOrder={handleCreatePurchaseOrder}
            />
          )}

          {activeModule === 'sales' && (
            <SalesView 
              t={t}
              customers={customers}
              newCustomer={newCustomer}
              setNewCustomer={setNewCustomer}
              newSale={newSale}
              setNewSale={setNewSale}
              currentChartData={currentChartData}
              handleCreateCustomer={handleCreateCustomer}
              handleCreateSalesOrder={handleCreateSalesOrder}
            />
          )}

          {activeModule === 'production' && (
            <ProductionView 
              t={t}
              batches={batches}
              medicines={medicines}
              newBatch={newBatch}
              setNewBatch={setNewBatch}
              handleCreateBatch={handleCreateBatch}
              handleUpdateStep={handleUpdateStep}
              handleCompleteBatch={handleCompleteBatch}
            />
          )}

          {activeModule === 'accounts' && (
            <AccountsView 
              t={t}
              payables={payables}
              receivables={receivables}
              accountsSummary={accountsSummary}
              handlePayBill={handlePayBill}
              handleReceivePayment={handleReceivePayment}
            />
          )}

          {activeModule === 'theme' && (
            <ThemeView 
              t={t}
              themes={themes}
              theme={theme}
              newTheme={newTheme}
              setNewTheme={setNewTheme}
              handleCreateTheme={handleCreateTheme}
              handleActivateTheme={handleActivateTheme}
            />
          )}

        </div>
      </main>

    </div>
  );
}

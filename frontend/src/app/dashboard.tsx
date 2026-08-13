'use client';

import React, { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/i18n';
import { api } from '@/lib/api';
import {
  AppTheme,
  DEFAULT_THEME,
  applyTheme,
  normalizeTheme,
  notifyThemeChanged,
  useDarkMode,
  useLanguage,
} from '@/lib/theme';
import { Sidebar, TopBar } from '@/components';
import { 
  LayoutDashboard, 
  Store, 
  ShoppingCart, 
  BadgePercent, 
  Activity, 
  Wallet, 
  Palette 
} from 'lucide-react';

// Import page views from pages folder
import { 
  DashboardPage,
  StorePage,
  PurchasePage,
  SalesPage,
  ProductionPage,
  AccountsPage,
  ThemePage,
} from '@/views';

export default function SpansulesDashboard() {
  // Language, dark mode and the active theme are shared with the customer site
  const { lang, setLang } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const t = getTranslation(lang);

  // Active module synced to URL query parameter
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mod = params.get('module');
      if (mod) {
        setActiveModule(mod);
      }
    }
  }, []);

  const changeModule = (moduleName: string) => {
    setActiveModule(moduleName);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('module', moduleName);
      window.history.pushState({}, '', url.toString());
    }
  };

  // The sidebar plays two roles, so it needs two flags rather than one:
  // below `lg` it is an off-canvas drawer that must start closed on a phone,
  // and from `lg` up it is a static column that must start visible.
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // `lg` matches the Tailwind breakpoint the sidebar switches layout at
  const isDesktop = () =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

  const toggleSidebar = () => {
    if (isDesktop()) {
      setIsSidebarCollapsed((collapsed) => !collapsed);
    } else {
      setIsDrawerOpen((open) => !open);
    }
  };

  const closeSidebar = () => {
    if (isDesktop()) {
      setIsSidebarCollapsed(true);
    } else {
      setIsDrawerOpen(false);
    }
  };

  // Keep the page behind the drawer from scrolling while it is open
  useEffect(() => {
    if (!isDrawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isDrawerOpen]);

  // Resizing up to desktop should never leave the mobile drawer latched open
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsDrawerOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Dynamic Theme state (read from database and painted onto CSS variables)
  const [theme, setTheme] = useState<AppTheme>(DEFAULT_THEME);

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
  const [newTheme, setNewTheme] = useState({ name: '', primaryColor: '#0f5132', secondaryColor: '#d1e7dd', backgroundColor: '#f8fafc', fontFamily: "'Outfit', sans-serif", logoUrl: '/images/logo.png' });
  
  // Transactions form states
  const [newOrder, setNewOrder] = useState({ vendorId: '', poNumber: '', orderDate: new Date().toISOString().split('T')[0], items: [{ medicineId: '', quantity: 10, price: 100 }] });
  const [newSale, setNewSale] = useState({ customerId: '', invoiceNumber: '', items: [{ name: '', quantity: 1, price: 500 }] });

  // Load backend data
  const loadData = async () => {
    try {
      const activeThemeData = await api.getActiveTheme();
      if (activeThemeData) {
        const activeTheme = normalizeTheme(activeThemeData);
        setTheme(activeTheme);
        // Let the customer site (open in another tab) restyle immediately
        notifyThemeChanged(activeTheme);
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

  // Sync theme colours and language fonts to CSS variables globally
  useEffect(() => {
    applyTheme(theme, lang);
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
    setNewTheme({ name: '', primaryColor: '#0f5132', secondaryColor: '#d1e7dd', backgroundColor: '#f8fafc', fontFamily: "'Outfit', sans-serif", logoUrl: '/images/logo.png' });
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
    // `h-dvh` tracks the visual viewport, so mobile browser chrome cannot clip
    // the bottom of the layout the way `100vh` does.
    <div className="flex h-dvh overflow-hidden" style={{ backgroundColor: 'var(--background)', fontFamily: 'var(--font-family)' }}>

      {/* SIDEBAR COMPONENT */}
      <Sidebar
        modules={sidebarModules}
        activeModule={activeModule}
        onModuleChange={changeModule}
        isDrawerOpen={isDrawerOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={closeSidebar}
        onNavigate={() => setIsDrawerOpen(false)}
        theme={theme}
        lang={lang}
        onLangChange={setLang}
        t={t}
      />

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 bg-black/40 z-30 lg:hidden cursor-pointer"
        />
      )}

      {/* MAIN CONTAINER — min-w-0 lets wide tables scroll instead of stretching the page */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden transition-all duration-300">
        {/* TOP BAR COMPONENT */}
        <TopBar
          activeModule={activeModule}
          onToggleSidebar={toggleSidebar}
          t={t}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleDarkMode}
        />

        {/* SCROLLABLE MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 lg:p-8 bg-gray-50/50">

          {activeModule === 'dashboard' && (
            <DashboardPage 
              t={t}
              salesAnalytics={salesAnalytics}
              accountsSummary={accountsSummary}
              batches={batches}
              medicines={medicines}
              currentChartData={currentChartData}
            />
          )}

          {activeModule === 'store' && (
            <StorePage 
              t={t}
              medicines={medicines}
              newMedicine={newMedicine}
              setNewMedicine={setNewMedicine}
              handleCreateMedicine={handleCreateMedicine}
            />
          )}

          {activeModule === 'purchase' && (
            <PurchasePage 
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
            <SalesPage 
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
            <ProductionPage 
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
            <AccountsPage 
              t={t}
              payables={payables}
              receivables={receivables}
              accountsSummary={accountsSummary}
              handlePayBill={handlePayBill}
              handleReceivePayment={handleReceivePayment}
            />
          )}

          {activeModule === 'theme' && (
            <ThemePage 
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

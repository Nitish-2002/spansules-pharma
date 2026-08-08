'use strict';

import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const api = {
  // Theme endpoints
  getThemes: () => axios.get(`${API_BASE}/theme`).then(res => res.data),
  getActiveTheme: () => axios.get(`${API_BASE}/theme/active`).then(res => res.data),
  createTheme: (data: any) => axios.post(`${API_BASE}/theme`, data).then(res => res.data),
  activateTheme: (id: string) => axios.put(`${API_BASE}/theme/${id}/activate`).then(res => res.data),

  // Store endpoints
  getMedicines: (type?: string) => axios.get(`${API_BASE}/store`, { params: { type } }).then(res => res.data),
  createMedicine: (data: any) => axios.post(`${API_BASE}/store`, data).then(res => res.data),
  updateStock: (id: string, quantity: number) => axios.put(`${API_BASE}/store/${id}/stock`, { quantity }).then(res => res.data),

  // Purchase endpoints
  getVendors: () => axios.get(`${API_BASE}/purchase/vendors`).then(res => res.data),
  createVendor: (data: any) => axios.post(`${API_BASE}/purchase/vendors`, data).then(res => res.data),
  getPurchaseOrders: () => axios.get(`${API_BASE}/purchase/orders`).then(res => res.data),
  createPurchaseOrder: (data: any) => axios.post(`${API_BASE}/purchase/orders`, data).then(res => res.data),

  // Sales endpoints
  getCustomers: () => axios.get(`${API_BASE}/sales/customers`).then(res => res.data),
  createCustomer: (data: any) => axios.post(`${API_BASE}/sales/customers`, data).then(res => res.data),
  getSalesOrders: () => axios.get(`${API_BASE}/sales/orders`).then(res => res.data),
  createSalesOrder: (data: any) => axios.post(`${API_BASE}/sales/orders`, data).then(res => res.data),
  getSalesAnalytics: () => axios.get(`${API_BASE}/sales/analytics`).then(res => res.data),

  // Production endpoints
  getBatches: () => axios.get(`${API_BASE}/production/batches`).then(res => res.data),
  createBatch: (data: any) => axios.post(`${API_BASE}/production/batches`, data).then(res => res.data),
  updateBatchStep: (id: string, status: string, notes?: string) => axios.put(`${API_BASE}/production/steps/${id}`, { status, notes }).then(res => res.data),
  updateBatchStatus: (id: string, status: string) => axios.put(`${API_BASE}/production/batches/${id}/status`, { status }).then(res => res.data),

  // Accounts endpoints
  getAccountsPayable: () => axios.get(`${API_BASE}/accounts/payable`).then(res => res.data),
  getAccountsReceivable: () => axios.get(`${API_BASE}/accounts/receivable`).then(res => res.data),
  payBill: (id: string, amount: number) => axios.put(`${API_BASE}/accounts/payable/${id}/pay`, { amount }).then(res => res.data),
  receivePayment: (id: string, amount: number) => axios.put(`${API_BASE}/accounts/receivable/${id}/receive`, { amount }).then(res => res.data),
  getAccountsSummary: () => axios.get(`${API_BASE}/accounts/summary`).then(res => res.data),
};

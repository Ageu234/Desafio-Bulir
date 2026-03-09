import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  getBalance: () => api.get('/users/balance'),
  getAllUsers: () => api.get('/users'),
};

export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id: string) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
  getMyServices: () => api.get('/services/provider/my-services'),
};

export const reservationsAPI = {
  create: (data: any) => api.post('/reservations', data),
  delete: (id: string) => api.delete(`/reservations/${id}`),
  getHistory: () => api.get('/reservations/history/my-history'),
  getAll: () => api.get('/reservations'),
};

export const transactionsAPI = {
  getAll: () => api.get('/transactions'),
  getMyTransactions: () => api.get('/transactions/user/my-transactions'),
  getById: (id: string) => api.get(`/transactions/${id}`),
};

export default api;

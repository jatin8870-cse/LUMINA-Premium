import api from './axios';
export const getStats = () => api.get('/admin/stats');
export const getAdminProducts = () => api.get('/admin/products');
export const createProduct = data => api.post('/admin/products', data);
export const getAdminOrders = params => api.get('/admin/orders', { params });
export const updateOrderStatus = (id, data) => api.put(`/admin/orders/${id}/status`, data);
export const getCoupons = () => api.get('/admin/coupons');
export const getBanners = () => api.get('/admin/banners');

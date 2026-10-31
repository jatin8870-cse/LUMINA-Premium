import api from './axios';
export const createOrder = data => api.post('/orders', data);
export const getMyOrders = () => api.get('/orders/my');
export const getOrder = id => api.get(`/orders/${id}`);
export const cancelOrder = id => api.put(`/orders/${id}/cancel`);
export const invoiceUrl = id => `${api.defaults.baseURL}/orders/${id}/invoice`;

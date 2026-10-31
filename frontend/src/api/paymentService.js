import api from './axios';
export const demoPay = data => api.post('/payment/demo-pay', data);

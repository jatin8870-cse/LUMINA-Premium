import api from './axios';
export const register = data => api.post('/auth/register', data);
export const login = data => api.post('/auth/login', data);
export const me = () => api.get('/auth/me');
export const updateProfile = data => api.put('/auth/profile', data);
export const addAddress = data => api.post('/auth/address', data);

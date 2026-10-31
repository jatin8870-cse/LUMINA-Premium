import api from './axios';
export const getProducts = params => api.get('/products', { params });
export const getProduct = id => api.get(`/products/${id}`);
export const getBestsellers = () => api.get('/products/bestsellers');
export const getBanners = () => api.get('/banners');

import api from './axios';
export const getCart = () => api.get('/cart');
export const addCartItem = data => api.post('/cart/add', data);
export const mergeCart = items => api.post('/cart/merge', { items });
export const updateCartItem = (id, qty) => api.put(`/cart/update/${id}`, { qty });
export const removeCartItem = id => api.delete(`/cart/remove/${id}`);
export const clearCart = () => api.delete('/cart/clear');

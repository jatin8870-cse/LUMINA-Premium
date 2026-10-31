import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoProducts } from '../data/products';
import api from '../api/axios';
import { addCartItem, clearCart as clearServerCart, getCart, mergeCart, removeCartItem, updateCartItem } from '../api/cartService';
import { useAuth } from './AuthContext';

const StoreContext = createContext(null);
export function StoreProvider({ children }) {
  const { user } = useAuth();
  const [products, setProducts] = useState(demoProducts);
  const [banners, setBanners] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('lumina-cart') || '[]'));
  const [loading, setLoading] = useState(true);
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  useEffect(() => {
    let active = true;
    Promise.all([api.get('/products'), api.get('/banners')]).then(([p, b]) => {
      if (!active) return;
      const rows = p.data?.data?.products || p.data?.products || p.data?.data || [];
      if (rows.length) setProducts(rows);
      setBanners(b.data?.data || []);
    }).catch(() => {}).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!user) { localStorage.setItem('lumina-cart', JSON.stringify(cart)); return; }
    const guest = JSON.parse(localStorage.getItem('lumina-cart') || '[]');
    (guest.length ? mergeCart(guest.map(x => ({ product: x.product._id, qty: x.qty }))) : getCart())
      .then(r => { setCart(r.data.data || []); localStorage.removeItem('lumina-cart'); }).catch(() => {});
  }, [user]);
  const addToCart = async (product, qty = 1) => {
    if (user) { const r = await addCartItem({ product: product._id, qty }); setCart(r.data.data || []); }
    else setCart(old => { const found = old.find(x => x.product._id === product._id); return found ? old.map(x => x.product._id === product._id ? { ...x, qty: x.qty + qty } : x) : [...old, { product, qty }]; });
  };
  const updateQty = async (id, qty) => {
    if (user) { const r = await updateCartItem(id, qty); setCart(r.data.data || []); }
    else setCart(old => qty < 1 ? old.filter(x => x.product._id !== id) : old.map(x => x.product._id === id ? { ...x, qty } : x));
  };
  const removeFromCart = async id => { if (user) { const r = await removeCartItem(id); setCart(r.data.data || []); } else setCart(old => old.filter(x => x.product._id !== id)); };
  const clearCart = async () => { if (user) await clearServerCart(); setCart([]); };
  const value = useMemo(() => ({ products, banners, loading, cart, addToCart, updateQty, removeFromCart, clearCart, api: apiBase }), [products, banners, loading, cart, user]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export const useStore = () => useContext(StoreContext);

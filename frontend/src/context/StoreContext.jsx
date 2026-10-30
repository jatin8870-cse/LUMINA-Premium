import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { demoProducts } from '../data/products';
const StoreContext = createContext(null);
export function StoreProvider({ children }) {
    const [products, setProducts] = useState(demoProducts);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('lumina-cart') || '[]'));
    const [loading, setLoading] = useState(false);
    const api = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    useEffect(() => { localStorage.setItem('lumina-cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => {
        let alive = true; setLoading(true); axios.get(`${api}/products`).then(r => {
            const rows = Array.isArray(r.data) ? r.data : r.data.products;
            if (alive && Array.isArray(rows) && rows.length) setProducts(rows);
        }).catch(() => { }).finally(() => alive && setLoading(false));
        return () => { alive = false };
    }, [api]);
    const addToCart = (product, qty = 1) => setCart(old => {
        const found = old.find(x => x.product._id === product._id);
        return found ? old.map(x => x.product._id === product._id ? { ...x, qty: x.qty + qty } : x) : [...old, { product, qty }];
    });
    const updateQty = (id, qty) => setCart(old => qty < 1 ? old.filter(x => x.product._id !== id)
        : old.map(x => x.product._id === id ? { ...x, qty } : x));
    const removeFromCart = id => setCart(old => old.filter(x => x.product._id !== id));
    const clearCart = () => setCart([]);
    const value = useMemo(() => ({ products, loading, cart, addToCart, updateQty, removeFromCart, clearCart, api }), [products, loading, cart]);
    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export const useStore = () => useContext(StoreContext);

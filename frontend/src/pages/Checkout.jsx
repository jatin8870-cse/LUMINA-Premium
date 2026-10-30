import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import axios from 'axios';
import { useStore } from '../context/StoreContext';
export default function Checkout() {
    const { cart, clearCart, api } = useStore();
    const navigate = useNavigate();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
    const subtotal = cart.reduce((s, x) => s + x.product.price * x.qty, 0);
    const shipping = subtotal >= 1499 ? 0 : 99;
    const total = subtotal + shipping;
    const change = e => setForm({ ...form, [e.target.name]: e.target.value });

    async function placeOrder(e) {
        e.preventDefault(); if (!cart.length) return; setBusy(true);
        setError('');
        try {
            const token = localStorage.getItem('lumina-token');
            const payload = {
                items: cart.map(x => ({
                    product: x.product._id, qty: x.qty, price: x.product.price
                })),
                total, address: { ...form }
            };
            const { data } = await axios.post(`${api}/orders`, payload,
                { headers: token ? { Authorization: `Bearer ${token}` } : {} });
            if (data?.key || import.meta.env.VITE_RAZORPAY_KEY) {
                const key = data.key || import.meta.env.VITE_RAZORPAY_KEY;
                if (!window.Razorpay) {
                    setError('Payment checkout is not loaded. Add Razorpay script in index.html and configure the backend order endpoint.');
                    setBusy(false); return;
                }
                const options = {
                    key, amount: data.amount || total * 100, currency: data.currency || 'INR', name: 'LUMINA', description: 'A little care goes a long way', order_id: data.razorpayOrderId || data.order?.id,
                    handler: async response => {
                        try {
                            await axios.post(`${api}/orders/verify-payment`, { ...response, orderId: data.order?._id || data._id });
                            clearCart();
                            navigate('/order-success');
                        }
                        catch {
                            setError('Payment received, but order confirmation needs support. Please contact us.');
                            setBusy(false);
                        }
                    }, prefill: { name: form.name, email: form.email, contact: form.phone }, theme: { color: '#252820' }
                };
                new window.Razorpay(options).open(); setBusy(false); return;
            }
            clearCart();
            navigate('/order-success');
        }
        catch (err) { setError(err.response?.data?.message || 'Could not place your order. Check that the backend is running and its order API matches this frontend.'); }
        finally { setBusy(false); }
    }
    if (!cart.length)
        return <main className="empty-cart">
            <h2>Your bag is empty.</h2>
            <Link to="/shop" className="button button-dark">Explore the collection</Link>
        </main>;
    return <main className="page-shell">
        <Link to="/cart" className="back-link"><ArrowLeft size={15} /> Back to bag</Link>
        <div className="page-title checkout-title"><p className="eyebrow">ALMOST YOURS</p>
            <h1>Let's make it <em>official.</em></h1>
            <p>Where should we send your little moment of calm?</p></div>
        <div className="checkout-layout">
            <form className="checkout-form" onSubmit={placeOrder}>
                <h2>01. Delivery details</h2>
                <div className="form-grid">
                    <label className="span-2">Full name
                        <input name="name" value={form.name} onChange={change} required placeholder="Your name" /></label>
                    <label>Email address<input type="email" name="email" value={form.email} onChange={change} required placeholder="you@example.com" /></label>
                    <label>Phone number<input name="phone" value={form.phone} onChange={change} required pattern="[0-9]{10}" placeholder="10-digit mobile" /></label>
                    <label className="span-2">Address
                        <input name="address" value={form.address} onChange={change} required placeholder="House no., street, area" /></label><label>City
                        <input name="city" value={form.city} onChange={change} required /></label><label>State<input name="state" value={form.state} onChange={change} required /></label>
                    <label>PIN code<input name="pincode" value={form.pincode} onChange={change} required pattern="[0-9]{6}" /></label></div>
                <div className="payment-note">
                    <LockKeyhole size={18} /><div><b>02. Secure payment</b><p>You'll be able to complete payment securely with Razorpay once the backend payment order is configured.</p></div>
                </div>{error && <p className="form-error">{error}</p>}
                <button disabled={busy} className="button button-dark checkout-btn" type="submit">{busy ? 'Preparing secure checkout…' : `Continue to payment · ₹${total.toLocaleString('en-IN')}`}</button></form>
            <aside className="order-summary checkout-summary"><p className="eyebrow">YOUR SELECTION</p><h2>Order summary</h2>
                {cart.map(x => <div className="mini-order" key={x.product._id}>
                    <img src={x.product.images?.[0]} alt="" /><span>{x.product.name}
                        <small>Qty {x.qty}</small></span><b>₹{(x.product.price * x.qty).toLocaleString('en-IN')}</b></div>)}
                <div><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div>
                <div><span>Shipping</span><b>{shipping ? '₹99' : 'Free'}</b></div>
                <div className="summary-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div></aside></div></main>
}

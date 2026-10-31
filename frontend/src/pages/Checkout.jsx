import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orderService';
import { demoPay } from '../api/paymentService';
export default function Checkout() {
  const { cart, clearCart } = useStore(); const { user } = useAuth(); const navigate = useNavigate();
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [method, setMethod] = useState('COD'); const [cardNumber, setCardNumber] = useState('');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', address: '', city: '', state: '', pincode: '' });
  const subtotal = cart.reduce((s, x) => s + x.product.price * x.qty, 0); const shipping = subtotal >= 999 ? 0 : 49; const total = subtotal + shipping;
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  async function placeOrder(e) { e.preventDefault(); if (!user) { navigate('/login'); return; } setBusy(true); setError('');
    try { const r = await createOrder({ address: { ...form, line1: form.address }, paymentMethod: method }); const order = r.data.data;
      if (method === 'Online-Demo') await demoPay({ orderId: order._id, cardNumber }); await clearCart(); navigate('/success', { state: { orderId: order._id } });
    } catch (err) { setError(err.response?.data?.message || 'Could not place your order.'); } finally { setBusy(false); }
  }
  if (!cart.length) return <main className="empty-cart"><h2>Your bag is empty.</h2><Link to="/shop" className="button button-dark">Explore the collection</Link></main>;
  return <main className="page-shell"><Link to="/cart" className="back-link"><ArrowLeft size={15} /> Back to bag</Link>
    <div className="page-title checkout-title"><p className="eyebrow">ALMOST YOURS</p><h1>Let's make it <em>official.</em></h1><p>Where should we send your little moment of calm?</p></div>
    <div className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder}><h2>01. Delivery details</h2><div className="form-grid">
      <label className="span-2">Full name<input name="name" value={form.name} onChange={change} required /></label><label>Email address<input type="email" name="email" value={form.email} onChange={change} required /></label><label>Phone number<input name="phone" value={form.phone} onChange={change} required pattern="[0-9]{10}" /></label><label className="span-2">Address<input name="address" value={form.address} onChange={change} required /></label><label>City<input name="city" value={form.city} onChange={change} required /></label><label>State<input name="state" value={form.state} onChange={change} required /></label><label>PIN code<input name="pincode" value={form.pincode} onChange={change} required pattern="[0-9]{6}" /></label></div>
      <div className="payment-note"><LockKeyhole size={18} /><div><b>02. Payment</b><p><label><input type="radio" checked={method === 'COD'} onChange={() => setMethod('COD')} /> Cash on delivery</label> <label><input type="radio" checked={method === 'Online-Demo'} onChange={() => setMethod('Online-Demo')} /> Demo online payment</label></p>{method === 'Online-Demo' && <input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Demo card number (end in 0000 to fail)" required />}</div></div>
      {error && <p className="form-error">{error}</p>}<button disabled={busy} className="button button-dark checkout-btn" type="submit">{busy ? 'Placing order…' : `Place order · ₹${total.toLocaleString('en-IN')}`}</button></form>
      <aside className="order-summary checkout-summary"><p className="eyebrow">YOUR SELECTION</p><h2>Order summary</h2>{cart.map(x => <div className="mini-order" key={x.product._id}><img src={x.product.images?.[0]} alt="" /><span>{x.product.name}<small>Qty {x.qty}</small></span><b>₹{(x.product.price * x.qty).toLocaleString('en-IN')}</b></div>)}<div><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div><div><span>Shipping</span><b>{shipping ? '₹49' : 'Free'}</b></div><div className="summary-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div></aside></div></main>;
}

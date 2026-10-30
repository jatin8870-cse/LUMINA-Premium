import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
export default function Cart() {
    const { cart, updateQty, removeFromCart } = useStore();
    const navigate = useNavigate();
    const subtotal = cart.reduce((s, x) => s + x.product.price * x.qty, 0);
    const shipping = subtotal >= 1499 || subtotal === 0 ? 0 : 99;
    return <main className="page-shell">
        <div className="page-title">
            <p className="eyebrow">YOUR LUMINA EDIT</p>
            <h1>Your bag<span>.</span></h1>
            <p>A few good things, all in one place.</p>
        </div>{!cart.length ? <div className="empty-cart">
            <div className="empty-icon">✳</div>
            <h2>Your bag is taking a little breather.</h2>
            <p>Let's find something lovely for your daily ritual.</p>
            <Link to="/shop" className="button button-dark">Explore the collection <ArrowRight size={16} />
            </Link></div> : <div className="cart-layout">
            <div className="cart-items">{cart.map(({ product: p, qty }) =>
                <article className="cart-item" key={p._id}>
                    <img src={p.images?.[0]} alt={p.name} />
                    <div className="cart-item-info">
                        <p className="eyebrow">{p.category}</p>
                        <h3>{p.name}</h3><span>₹{Number(p.price).toLocaleString('en-IN')}</span>
                        <div className="qty-control">
                            <button onClick={() => updateQty(p._id, qty - 1)}>
                                <Minus size={13} />
                            </button>
                            <span>{qty}</span>
                            <button onClick={() => updateQty(p._id, qty + 1)}>
                                <Plus size={13} />
                            </button>
                        </div>
                    </div>
                    <div className="cart-item-end"><b>₹{(p.price * qty).toLocaleString('en-IN')}</b>
                        <button className="remove-btn" onClick={() => removeFromCart(p._id)} aria-label="Remove item">
                            <Trash2 size={16} /></button></div></article>)}<Link to="/shop" className="back-link">
                    <ArrowLeft size={15} /> Continue shopping</Link></div>
            <aside className="order-summary"><p className="eyebrow">THE LITTLE DETAILS</p>
                <h2>Order summary</h2><div><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div>
                <div><span>Shipping</span><b>{shipping === 0 ? 'Complimentary' : `₹${shipping}`}</b></div>
                <div className="summary-total"><span>Total</span><strong>₹{(subtotal + shipping).toLocaleString('en-IN')}</strong></div>
                <p className="shipping-hint">{subtotal >= 1499 ? 'You unlocked complimentary shipping ✳' : `Add ₹${(1499 - subtotal).toLocaleString('en-IN')} more for complimentary shipping.`}</p>
                <button className="button button-dark checkout-btn" onClick={() => navigate('/checkout')}>Continue to checkout
                    <ArrowRight size={16} /></button>
                <p className="secure-note">Secure checkout · Thoughtful delivery</p>
            </aside>
        </div>
        }
    </main>
}

import React from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
export default function Product() {
    const { id } = useParams();
    const { products, addToCart } = useStore();
    const navigate = useNavigate();
    const p = products.find(x => x._id === id) || products[0];
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const handleAdd = async () => {
        if (added) {
            navigate('/cart');
            return;
        }
        await addToCart(p, qty);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 3500);
    };
    if (!p)
        return <main className="empty-state">Product not found.
            <Link to="/shop">Back to shop</Link></main>;
    return <main className="page-shell">
        <Link to="/shop" className="back-link">
            <ArrowLeft size={15} /> Back to collection</Link>
        <section className="product-detail"><div className="detail-image">
            <img src={p.images?.[0]} alt={p.name} /></div>
            <div className="detail-copy"><p className="eyebrow">{p.category} · LUMINA ESSENTIALS</p>
                <h1>{p.name}</h1><div className="rating">★★★★★ <span>{p.rating || '4.8'} · Loved by our community</span></div>
                <div className="detail-price"><strong>₹{Number(p.price).toLocaleString('en-IN')}</strong>{p.mrp > p.price && <del>₹{Number(p.mrp).toLocaleString('en-IN')}</del>}</div>
                <p className="detail-description">{p.description}</p><p className="size-note">SIZE / {p.size || 'Everyday essential'}</p>
                <div className="detail-actions"><div className="qty-control"><button onClick={() => setQty(Math.max(1, qty - 1))}>
                    <Minus size={14} /></button>
                    <span>{qty}</span><button onClick={() => setQty(qty + 1)}><Plus size={14} /></button></div>
                    <button className={`button button-dark add-large${added ? ' product-detail-added' : ''}`} onClick={handleAdd}>
                        <ShoppingBag size={17} /> {added ? 'Added to bag · View bag' : `Add to bag · ₹${(p.price * qty).toLocaleString('en-IN')}`}</button></div>
                <div className="delivery-note"><Truck size={19} /><span><b>A little something, delivered.</b><br />Complimentary shipping on orders over ₹999.</span></div>
                <div className="detail-accordion"><details open><summary>THE FEEL-GOOD DETAILS</summary><p>{p.description}</p></details><details>
                    <summary>HOW TO MAKE IT A RITUAL</summary><p>Use as part of your daily routine. Start with a small amount and adjust to what feels right for your skin.</p></details></div></div></section>
        <section className="related"><p className="eyebrow">KEEP THE GOOD FEELING GOING</p><h2>You may also <em>love.</em></h2>
            <div className="product-grid">{products.filter(x => x._id !== p._id).slice(0, 3).map((x, i) => <ProductCard key={x._id} p={x} index={i} />)}
            </div></section></main>
}

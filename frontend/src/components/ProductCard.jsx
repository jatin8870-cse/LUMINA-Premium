import React from "react";
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import './ProductCard.css';
export default function ProductCard({ p, index = 0 }) {
    const { addToCart } = useStore();
    const [added, setAdded] = useState(false);
    const [adding, setAdding] = useState(false);
    const handleAdd = async () => {
        if (adding) return;
        setAdding(true);
        try {
            await addToCart(p);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 3500);
        } finally {
            setAdding(false);
        }
    };
    return <article className="product-card"
        style={{ '--delay': `${index * 70}ms` }}>
        <Link to={`/product/${p._id}`} className="product-image-wrap">
            <img src={p.images?.[0]} alt={p.name} loading="lazy" />
            <span className="product-badge">{p.badge || 'LUMINA FAVOURITE'}</span>
            <span className="quick-view">View product <ArrowUpRight size={15} />
            </span>
        </Link><div className="product-info">
            <div><p className="eyebrow">{p.category} · {p.size || 'Daily ritual'}</p>
                <Link to={`/product/${p._id}`}><h3>{p.name}</h3></Link>
                <div className="rating">★★★★★ <span>{p.rating || '4.8'}</span></div></div>
            <div className="product-buy">
                <div><strong>₹{Number(p.price).toLocaleString('en-IN')}</strong>
                    {p.mrp > p.price && <del>₹{Number(p.mrp).toLocaleString('en-IN')}</del>}</div>
                <div className={`product-add-action${added ? ' product-add-action-added' : ''}`}>
                    <button aria-label={`Add ${p.name} to bag`} onClick={handleAdd} disabled={adding}>
                        {added ? <Check size={17} /> : <Plus className={adding ? 'product-add-spin' : ''} size={17} />}
                    </button>
                    {added && <Link className="view-bag-action" to="/cart"><ShoppingBag size={13} /> View bag</Link>}
                </div>
            </div>
        </div>
    </article>
}

import React from "react";
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
export default function ProductCard({ p, index = 0 }) {
    const { addToCart } = useStore();
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
                <button aria-label={`Add ${p.name} to bag`} onClick={() => addToCart(p)}>
                    <Plus size={17} />
                </button>
            </div>
        </div>
    </article>
}

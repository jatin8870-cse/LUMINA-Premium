import React from "react";
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, Leaf, Droplets, Sparkles } from 'lucide-react';

import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { useStore } from '../context/StoreContext';
export default function Home() {
    const { products } = useStore();
    return <main><section className="hero">
        <div className="hero-copy">
            <p className="eyebrow light-eyebrow">SKINCARE, CONSIDERED. · EST. 2026</p>
            <h1>Your skin.<br /><em>Your kind</em><br />of glow.</h1>
            <p className="hero-description">A thoughtful edit of everyday skincare, made to bring you back to yourself.</p>
            <Link to="/shop" className="button button-light">Discover the collection <ArrowUpRight size={17} /></Link>
            <div className="hero-note"><span>01 / 03</span><span>LESS, BUT LOVELIER</span>
                <ArrowDownRight size={18} /></div></div>
        <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1300&q=90" alt="Minimal skincare bottles in warm sunlight" />
            <div className="hero-stamp">THE<br />EVERYDAY<br /><i>Ritual</i></div>
            <span className="image-caption">A softer approach to skin.</span></div></section>
        <div className="marquee"><span>GOOD SKIN DAYS, EVERY DAY ✳ THOUGHTFUL FORMULAS ✳ YOUR DAILY MOMENT OF CALM ✳ </span></div>
        <section className="section products-section" id="rituals">
            <div className="section-top">
                <SectionHeading kicker="THE LUMINA EDIT" title="Your shelf, thoughtfully." copy="Meet the everyday essentials your skin will thank you for." />
                <Link className="text-link" to="/shop">Shop all products <ArrowUpRight size={16} /></Link></div>
            <div className="product-grid">{products.slice(0, 4).map((p, i) => <ProductCard key={p._id} p={p} index={i} />)}</div></section>
        <section className="philosophy" id="story"><div className="philosophy-image">
            <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1100&q=85" alt="Botanical skincare ingredients" />
            <span>MADE FOR REAL LIFE, AND REAL SKIN.</span></div>
            <div className="philosophy-copy"><p className="eyebrow">A NOTE FROM LUMINA</p><h2>Care that feels<br />
                <em>like coming home.</em></h2>
                <p>We believe skincare should feel less like a checklist and more like a moment you look forward to. So we keep things considered: purposeful essentials, comforting textures and rituals that fit into real life.</p>
                <div className="values"><div><Leaf /><span>Thoughtful<br />ingredients</span></div>
                    <div><Droplets /><span>Everyday<br />hydration</span></div>
                    <div><Sparkles /><span>Feel-good<br />rituals</span></div>
                </div><Link to="/shop" className="text-link">Find your ritual <ArrowUpRight size={16} /></Link></div></section>
        <section className="quote-section"><p className="eyebrow">A GENTLER KIND OF GLOW</p><blockquote>“The best routine is the one that makes you feel good in your own skin.”</blockquote><span>THE LUMINA POINT OF VIEW</span></section>
        <section className="newsletter">
            <div><p className="eyebrow">A NOTE, NOW AND THEN</p><h2>Good things, <em>in your inbox.</em></h2><p>New rituals, thoughtful notes and little reasons to slow down.</p></div>
            <form onSubmit={e => { e.preventDefault(); alert('Thank you for joining the LUMINA list!') }}>
                <input type="email" required placeholder="Your email address" />
                <button type="submit">Count me in <ArrowUpRight size={16} /></button></form></section></main>
}

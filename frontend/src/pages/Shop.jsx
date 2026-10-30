import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { useStore } from '../context/StoreContext';
export default function Shop() {
    const { products, loading } = useStore();
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('featured');
    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
    const visible = useMemo(() => {
        let list = category === 'All' ? [...products] : products.filter(p => p.category === category);
        if (sort === 'low') list.sort((a, b) => a.price - b.price);
        if (sort === 'high') list.sort((a, b) => b.price - a.price);
        return list;
    }, [products, category, sort]);
    return <main className="page-shell">
        <div className="shop-banner">
            <p className="eyebrow">THE COMPLETE COLLECTION</p>
            <h1>Find your <em>everyday.</em></h1>
            <p>Small rituals. Feel-good formulas. A little glow, on repeat.</p></div>
        <div className="shop-toolbar">
            <div className="filter-pills">{categories.map(c =>
                <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
            <select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option></select></div>
        {loading && <p className="muted">Checking the latest collection…</p>}
        <div className="product-grid shop-grid">{visible.map((p, i) => <ProductCard key={p._id} p={p} index={i} />)}</div>
        {!visible.length && <p className="empty-state">No products in this category just yet.</p>}</main>
}

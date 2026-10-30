import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { cart } = useStore();
    const count = cart.reduce((n, x) => n + x.qty, 0);
    const links = [['Shop', '/shop'],
    ['Our philosophy', '/#story'],
    ['Rituals', '/#rituals']];
    return <>
        <div className="announcement">A little care goes a long way
            <span>✳</span>
            Complimentary shipping over ₹1,499
        </div>
        <header className="navbar">
            <Link to="/" className="brand" onClick={() => setOpen(false)}>
                LUMINA
                <span>SKINCARE STUDIO</span>
            </Link>
            <nav className="desktop-nav">
                {links.map(([t, u]) =>
                    <NavLink key={t} to={u}>{t}</NavLink>
                )}
            </nav>
            <div className="nav-actions">
                <Link to="/admin" className="admin-link">Studio <ArrowUpRight size={14} />
                </Link>
                <Link to="/cart" className="bag-link">
                    <ShoppingBag size={19} />
                    <span>Bag</span>
                    <i>{count}</i>
                </Link>
                <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                    {open ? <X /> : <Menu />}
                </button>
            </div>
        </header>
        {open && (
            <div className="mobile-menu">
                {links.map(([t, u]) => (
                    <Link key={t} to={u} onClick={() => setOpen(false)}>
                        {t}
                    </Link>
                ))}
                <Link to="/admin" onClick={() => setOpen(false)}>
                    Studio dashboard
                </Link>
            </div>
        )}
    </>
}

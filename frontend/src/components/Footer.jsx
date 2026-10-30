import React from "react";
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="footer">
            <div>
                <Link to="/" className="brand footer-brand">
                    LUMINA
                    <span>SKINCARE STUDIO</span>
                </Link>
                <p>Thoughtful formulas. Uncomplicated rituals.<br />A little more you, every day.</p>
            </div>
            <div className="footer-links">
                <div>
                    <b>EXPLORE</b>
                    <Link to="/shop">Shop all</Link>
                    <Link to="/#story">Our philosophy</Link>
                </div>
                <div>
                    <b>NEED HELP?</b>
                    <a href="mailto:hello@lumina.example">Get in touch</a>
                    <Link to="/cart">Your bag</Link>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2026 LUMINA Skincare Studio</span>
                <span>Made for your everyday glow ✳</span>
            </div>
        </footer>
    );
}

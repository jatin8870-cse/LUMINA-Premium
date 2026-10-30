import { Link } from 'react-router-dom'; import { Check } from 'lucide-react';
export default function Success() {
    return <main className="success-page">
        <div className="success-mark">
            <Check size={30} /></div>
        <p className="eyebrow">A LITTLE SOMETHING IS ON ITS WAY</p>
        <h1>Thank you for<br /><em>choosing you.</em></h1>
        <p>Your order has been placed. We'll take it from here.</p>
        <Link to="/shop" className="button button-dark">Back to the good stuff</Link></main>
}

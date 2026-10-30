import React from "react";
export default function SectionHeading({ kicker, title, copy }) {
    return <div className="section-heading">
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}
    </div>
}

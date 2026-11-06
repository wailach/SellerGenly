import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <nav className="nav">
        <div className="brand"><span className="brand-mark">S</span> SellerGenly</div>
        <div className="nav-links">
          <a href="#features">Features</a><a href="#pricing">Pricing</a>
          <Link className="btn ghost" href="/login">Log in</Link>
          <Link className="btn primary" href="/login">Start free</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="pill">✦ AI-powered e-commerce intelligence</div>
        <h1>Find products.<br/><span>Know your profit.</span></h1>
        <p>SellerGenly helps Etsy, Shopify, Amazon, KDP and POD sellers turn product ideas into profitable decisions.</p>
        <div className="hero-actions"><Link className="btn primary big" href="/login">Launch SellerGenly →</Link><a className="btn ghost big" href="#features">Explore features</a></div>
        <div className="trust">Built for creators, sellers and solo entrepreneurs.</div>
      </section>

      <section id="features" className="feature-grid">
        {[
          ["💰","Profit Calculator","See net profit, margin, break-even and ad limits before you publish."],
          ["🤖","AI Product Analysis","Get an AI assessment of pricing, positioning, risks and opportunities."],
          ["🔎","Product Research","Organize product ideas and evaluate opportunities from one workspace."],
          ["📈","Profit Forecast","Model monthly sales, revenue, costs and estimated profit."],
          ["💡","Product Ideas","Generate practical ideas for Etsy, Amazon, Shopify, KDP and POD."],
          ["⭐","Saved Products","Keep your best opportunities in one personal product library."]
        ].map(([icon,title,desc]) => <article className="card" key={title}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{desc}</p></article>)}
      </section>

      <section id="pricing" className="pricing-preview">
        <div><div className="pill">Simple plans</div><h2>Start free. Upgrade when SellerGenly pays for itself.</h2></div>
        <div className="price-row">
          <div className="price-card"><b>Free</b><strong>$0</strong><small>/ month</small><p>Core calculator + limited AI analyses.</p></div>
          <div className="price-card featured"><b>Pro</b><strong>$19</strong><small>/ month</small><p>Advanced AI, research, forecasts and saved products.</p></div>
          <div className="price-card"><b>Business</b><strong>$49</strong><small>/ month</small><p>Higher limits and team-ready features.</p></div>
        </div>
      </section>
    </main>
  );
}

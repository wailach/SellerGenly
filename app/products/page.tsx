"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  platform: string;
  cost: number;
  price: number;
  shipping: number;
  ads: number;
  fee_percent: number;
  notes: string | null;
  created_at: string;
};

const emptyForm = {
  name: "",
  platform: "Etsy",
  cost: "0",
  price: "0",
  shipping: "0",
  ads: "0",
  fee_percent: "6.5",
  notes: "",
};

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

function profit(p: Pick<Product, "price" | "cost" | "shipping" | "ads" | "fee_percent">) {
  return p.price - p.cost - p.shipping - p.ads - (p.price * p.fee_percent) / 100;
}

export default function ProductsPage() {
  const supabase = useMemo(() => createClient(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase
      .from("products")
      .select("id,name,platform,cost,price,shipping,ads,fee_percent,notes,created_at")
      .order("created_at", { ascending: false });

    if (queryError) setError(queryError.message);
    else setProducts((data ?? []) as Product[]);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setError("Your session has expired. Please log in again.");
      setSaving(false);
      return;
    }

    if (!form.name.trim()) {
      setError("Product name is required.");
      setSaving(false);
      return;
    }

    const { error: insertError } = await supabase.from("products").insert({
      user_id: auth.user.id,
      name: form.name.trim(),
      platform: form.platform,
      cost: Number(form.cost) || 0,
      price: Number(form.price) || 0,
      shipping: Number(form.shipping) || 0,
      ads: Number(form.ads) || 0,
      fee_percent: Number(form.fee_percent) || 0,
      notes: form.notes.trim() || null,
    });

    if (insertError) setError(insertError.message);
    else {
      setForm(emptyForm);
      setMessage("Product saved successfully.");
      await loadProducts();
    }
    setSaving(false);
  }

  async function deleteProduct(id: string) {
    setError("");
    const { error: deleteError } = await supabase.from("products").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else setProducts((current) => current.filter((p) => p.id !== id));
  }

  return (
    <main className="app-shell single">
      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">PRODUCTS</span>
            <h1>Your product workspace</h1>
          </div>
          <Link href="/dashboard" className="btn ghost">Dashboard</Link>
        </header>

        <div className="products-grid">
          <form className="panel form-panel" onSubmit={saveProduct}>
            <span className="eyebrow">SAVE A PRODUCT</span>
            <h2>Add product</h2>
            <p className="muted">Save real product economics to your private workspace.</p>

            <label>Product name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Personalized travel planner" /></label>
            <div className="two">
              <label>Platform<select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>{["Etsy", "Shopify", "Amazon", "KDP", "POD", "WooCommerce"].map((p) => <option key={p}>{p}</option>)}</select></label>
              <label>Fee %<input type="number" step="0.01" value={form.fee_percent} onChange={(e) => setForm({ ...form, fee_percent: e.target.value })} /></label>
            </div>
            <div className="two">
              <label>Unit cost<input type="number" step="0.01" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} /></label>
              <label>Selling price<input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
            </div>
            <div className="two">
              <label>Shipping<input type="number" step="0.01" value={form.shipping} onChange={(e) => setForm({ ...form, shipping: e.target.value })} /></label>
              <label>Ads<input type="number" step="0.01" value={form.ads} onChange={(e) => setForm({ ...form, ads: e.target.value })} /></label>
            </div>
            <label>Notes<textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes" /></label>
            {error && <div className="notice error">{error}</div>}
            {message && <div className="notice success">{message}</div>}
            <button className="btn primary big" type="submit" disabled={saving}>{saving ? "Saving…" : "Save product →"}</button>
          </form>

          <section className="panel">
            <div className="panel-head">
              <div><span className="eyebrow">SAVED PRODUCTS</span><h2>{products.length} product{products.length === 1 ? "" : "s"}</h2></div>
              <Link href="/calculator" className="btn ghost">Calculator</Link>
            </div>
            {loading ? <p className="muted">Loading your products…</p> : products.length === 0 ? (
              <div className="empty-state"><strong>No products yet.</strong><span>Add your first product and it will be stored securely in Supabase.</span></div>
            ) : (
              <div className="product-list">
                {products.map((product) => {
                  const net = profit(product);
                  const margin = product.price > 0 ? (net / product.price) * 100 : 0;
                  return <article className="product-row" key={product.id}>
                    <div className="product-main"><strong>{product.name}</strong><span>{product.platform} · {money(product.price)} sale price</span></div>
                    <div className="product-profit"><strong className={net >= 0 ? "positive" : "negative"}>{money(net)}</strong><span>{margin.toFixed(1)}% margin</span></div>
                    <button className="icon-btn" onClick={() => deleteProduct(product.id)} aria-label={`Delete ${product.name}`}>×</button>
                  </article>;
                })}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

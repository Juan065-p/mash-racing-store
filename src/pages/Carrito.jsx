import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORY_META, PRODUCTS } from "../data/products.js";
import { buildWhatsAppUrl, subtotalOf, toLines } from "../lib/cart.js";
import { cartActions, useCartItems } from "../lib/cartStore.js";
import { formatPrice } from "../lib/format.js";
import { useDocumentMeta } from "../lib/hooks.js";
import { FREE_SHIPPING_FROM, computeTotals } from "../lib/shop.js";
import { ROUTE_META } from "../lib/seo.js";

function CartImage({ src, alt, emoji }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="cart-item-img">
      <span aria-hidden="true">{emoji}</span>
      {!failed && <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} />}
    </div>
  );
}

export default function Carrito() {
  const meta = ROUTE_META["/carrito"];
  useDocumentMeta(meta.title, meta.description);
  const lines = toLines(useCartItems(), PRODUCTS);
  const totals = computeTotals(subtotalOf(lines));

  if (!lines.length) {
    return (
      <div className="cart-page">
        <div className="container">
          <Header />
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <i className="ti ti-shopping-cart-off" aria-hidden="true"></i>
            </div>
            <h2>Tu carrito está vacío</h2>
            <p>Descubre nuestra colección F1 y MotoGP</p>
            <Link to="/tienda" className="btn btn-primary">
              Ver tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const waUrl = buildWhatsAppUrl(lines);
  const progress = Math.min(100, Math.round((totals.subtotal / FREE_SHIPPING_FROM) * 100));

  return (
    <div className="cart-page">
      <div className="container">
        <Header />
        <div className="cart-layout">
          <div>
            <ul className="cart-items-list">
              {lines.map(({ id, size, qty, product: p }) => (
                <li key={`${id}-${size}`} className="cart-item">
                  <CartImage src={p.image} alt={p.name} emoji={p.emoji} />
                  <div>
                    <h2 className="cart-item-name">{p.name}</h2>
                    <div className="cart-item-meta">
                      Talla: {size} · {CATEGORY_META[p.category]?.label ?? p.category} · {formatPrice(p.price)} c/u
                    </div>
                    <div className="cart-qty">
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label={`Quitar una unidad de ${p.name}, talla ${size}`}
                        onClick={() => cartActions.setQty(id, size, qty - 1)}
                      >
                        <i className="ti ti-minus" aria-hidden="true"></i>
                      </button>
                      <span className="qty-val" aria-label={`${qty} unidades`}>
                        {qty}
                      </span>
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label={`Añadir una unidad de ${p.name}, talla ${size}`}
                        onClick={() => cartActions.setQty(id, size, qty + 1)}
                      >
                        <i className="ti ti-plus" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="btn-remove"
                        aria-label={`Eliminar ${p.name}, talla ${size}`}
                        onClick={() => cartActions.remove(id, size)}
                      >
                        <i className="ti ti-trash" aria-hidden="true"></i>Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">{formatPrice(p.price * qty)}</div>
                </li>
              ))}
            </ul>
            <div className="cart-actions">
              <Link to="/tienda" className="btn btn-outline btn-sm">
                <i className="ti ti-arrow-left" aria-hidden="true"></i>Seguir comprando
              </Link>
              <button type="button" className="btn-remove" onClick={() => cartActions.clear()}>
                <i className="ti ti-trash" aria-hidden="true"></i>Vaciar carrito
              </button>
            </div>
          </div>

          <aside className="order-summary" aria-label="Resumen del pedido">
            <h2>Resumen del pedido</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{totals.freeShipping ? "Gratis" : formatPrice(totals.shipping)}</span>
            </div>
            {totals.freeShipping ? (
              <p className="shipping-progress-note ok">
                <i className="ti ti-circle-check" aria-hidden="true"></i> ¡Tu envío es gratis!
              </p>
            ) : (
              <div className="shipping-progress">
                <div className="shipping-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Progreso hacia envío gratis">
                  <span style={{ width: `${progress}%` }}></span>
                </div>
                <p className="shipping-progress-note">
                  Te faltan <strong>{formatPrice(totals.missingForFree)}</strong> para envío gratis (desde{" "}
                  {formatPrice(FREE_SHIPPING_FROM)}).
                </p>
              </div>
            )}
            <div className="summary-total">
              <span>Total</span>
              <span data-testid="cart-total">{formatPrice(totals.total)}</span>
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-checkout" data-testid="whatsapp-checkout">
              <i className="ti ti-brand-whatsapp" aria-hidden="true"></i>Pedir por WhatsApp
            </a>
            <p className="summary-note">
              Se abrirá WhatsApp con tu pedido listo. Confirmamos disponibilidad y coordinamos el pago contigo.
            </p>
          </aside>
        </div>
      </div>

      <div className="cart-sticky-cta">
        <div>
          <span className="cart-sticky-label">Total</span>
          <strong>{formatPrice(totals.total)}</strong>
        </div>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-checkout">
          <i className="ti ti-brand-whatsapp" aria-hidden="true"></i>Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link> / <Link to="/tienda">Tienda</Link> / <span aria-current="page">Carrito</span>
      </nav>
      <h1 className="section-title" style={{ marginTop: ".5rem" }}>
        Tu <span>carrito</span>
      </h1>
    </div>
  );
}

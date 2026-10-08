import { Link } from "react-router-dom";
import { useDocumentMeta } from "../lib/hooks.js";
import { ROUTE_META } from "../lib/seo.js";

function SimplePage({ route, icon, title, children }) {
  const meta = ROUTE_META[route];
  useDocumentMeta(meta.title, meta.description);
  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <i className={`ti ${icon}`} aria-hidden="true"></i>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.4rem" }}>{title}</h1>
          {children}
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <SimplePage route="/404" icon="ti-error-404" title="Página no encontrada">
      <p>La página que buscas no existe o cambió de dirección.</p>
    </SimplePage>
  );
}

export function Admin() {
  return (
    <SimplePage route="/admin" icon="ti-tools" title="Panel en preparación">
      <p>El panel de administración no está disponible por ahora.</p>
    </SimplePage>
  );
}

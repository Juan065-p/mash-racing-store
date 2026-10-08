import { formatPrice } from "../lib/format.js";
import { FREE_SHIPPING_FROM, SHIPPING_COST } from "../lib/shop.js";

/** Información de envío y de cómo se compra. Solo afirma lo que el flujo actual realmente hace. */
export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Cómo comprar y envíos">
      <ul className="container trust-list">
        <li>
          <i className="ti ti-brand-whatsapp" aria-hidden="true"></i>
          <span>
            <strong>Pides por WhatsApp</strong>
            Armas el carrito y nos envías el pedido; confirmamos disponibilidad contigo.
          </span>
        </li>
        <li>
          <i className="ti ti-truck" aria-hidden="true"></i>
          <span>
            <strong>Envíos a toda Colombia</strong>
            Gratis desde {formatPrice(FREE_SHIPPING_FROM)}; {formatPrice(SHIPPING_COST)} en el resto.
          </span>
        </li>
        <li>
          <i className="ti ti-credit-card" aria-hidden="true"></i>
          <span>
            <strong>Pago coordinado contigo</strong>
            Coordinamos el pago contigo por WhatsApp al confirmar tu pedido.
          </span>
        </li>
      </ul>
    </section>
  );
}

import { useEffect, useId, useRef, useState } from "react";
import { CATEGORY_META } from "../data/products.js";
import { F1_TEAMS } from "../lib/filters.js";
import { formatPrice } from "../lib/format.js";
import { cartActions } from "../lib/cartStore.js";
import { useToast } from "./Toast.jsx";

const TEAM_LABEL = Object.fromEntries(F1_TEAMS.map((t) => [t.value, t.label]));
const BADGE_CLASS = { Premium: "tag-gold", Limitado: "tag-yellow" };

/** Imagen remota con emoji de respaldo. Evita el bug de "opacity:0 para siempre" si la imagen
 *  termina de cargar antes de la hidratación (se revisa img.complete al montar). */
function ProductImage({ src, alt, emoji }) {
  const ref = useRef(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  return (
    <>
      <span className="product-emoji" aria-hidden="true">
        {emoji}
      </span>
      {state !== "error" && (
        <img
          ref={ref}
          className={`product-img${state === "loaded" ? " loaded" : ""}`}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}
    </>
  );
}

export default function ProductCard({ product: p }) {
  const { notify } = useToast();
  const needsSize = p.sizes.length > 1;
  const [size, setSize] = useState(needsSize ? null : p.sizes[0]);
  const [hint, setHint] = useState(false);
  const [added, setAdded] = useState(false);
  const groupId = useId();
  const meta = CATEGORY_META[p.category] ?? {};
  const teamLabel = p.team ? TEAM_LABEL[p.team] : null;

  const add = () => {
    if (!size) {
      setHint(true);
      return;
    }
    cartActions.add(p.id, size);
    notify(`${p.name}${needsSize ? ` (talla ${size})` : ""} agregado al carrito`, { cartLink: true });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card" data-id={p.id}>
      <div className="product-image">
        <ProductImage src={p.image} alt={p.name} emoji={p.emoji} />
        {p.badge && (
          <div className="product-badge">
            <span className={`tag ${BADGE_CLASS[p.badge] ?? ""}`}>{p.badge}</span>
          </div>
        )}
      </div>
      <div className="product-body">
        <div className="product-category">
          {meta.label ?? p.category}
          {teamLabel ? ` · ${teamLabel}` : ""}
        </div>
        <h3 className="product-name">{p.name}</h3>
        <div className="product-price">{formatPrice(p.price)}</div>
        {needsSize && (
          <div className="size-picker" role="radiogroup" aria-labelledby={`${groupId}-l`}>
            <span id={`${groupId}-l`} className="size-label">
              Talla
            </span>
            {p.sizes.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                className={`size-btn${size === s ? " active" : ""}`}
                onClick={() => {
                  setSize(s);
                  setHint(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {hint && (
          <p className="size-hint" role="alert">
            Elige una talla para añadir al carrito
          </p>
        )}
      </div>
      <div className="product-footer">
        <button type="button" className={`btn-add-cart${added ? " added" : ""}`} onClick={add}>
          <i className={`ti ${added ? "ti-check" : "ti-shopping-cart-plus"}`} aria-hidden="true"></i>
          {added ? "Añadido" : "Añadir al carrito"}
          <span className="sr-only"> {p.name}</span>
        </button>
      </div>
    </article>
  );
}

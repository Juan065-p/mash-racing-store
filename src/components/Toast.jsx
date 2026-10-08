import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ToastContext = createContext({ notify: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(0);

  const notify = useCallback((message, { cartLink = false } = {}) => {
    clearTimeout(timer.current);
    setToast({ message, cartLink, key: Date.now() });
    timer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);
  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        <i className="ti ti-circle-check" aria-hidden="true"></i>
        <span id="toast-msg">{toast?.message}</span>
        {toast?.cartLink && (
          <Link to="/carrito" className="toast-link">
            Ver carrito
          </Link>
        )}
      </div>
    </ToastContext.Provider>
  );
}

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Carrito from "./pages/Carrito.jsx";
import { Escala, MotoGP, Tienda } from "./pages/Catalogs.jsx";
import { Admin, NotFound } from "./pages/Misc.jsx";

/** /tienda.html → /tienda (por si se llega a una URL antigua sin pasar por la redirección de Netlify). */
function StripHtml() {
  const { pathname, search } = useLocation();
  const clean = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "") || "/";
  return <Navigate to={`${clean}${search}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tienda" element={<Tienda />} />
        <Route path="motogp" element={<MotoGP />} />
        <Route path="escala" element={<Escala />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="*.html" element={<StripHtml />} />
        <Route path="index.html" element={<StripHtml />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

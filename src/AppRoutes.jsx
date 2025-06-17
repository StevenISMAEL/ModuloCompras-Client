import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./features/home";
import Proveedores from "./features/providers";
import Productos from "./features/products";
import Compras from "./features/purchases";
import InvoiceModule from "./features/invoice"; // Asegúrate de importar tu módulo de facturas

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="proveedores/*" element={<Proveedores />} />
        <Route path="facturas/*" element={<InvoiceModule />} />
        <Route path="productos" element={<Productos />} />
        <Route path="compras" element={<Compras />} />
      </Route>
    </Routes>
  );
}

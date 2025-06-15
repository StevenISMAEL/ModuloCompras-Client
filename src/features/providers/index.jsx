import { Routes, Route } from "react-router-dom";
import ProviderList from "./components/ProviderList";
import ProviderForm from "./components/ProviderForm";
import ProviderDetails from "./components/ProviderDetails";
import ProviderDelete from "./components/ProviderDelete";

export default function Proveedores() {
  return (
    <Routes>
      <Route index element={<ProviderList />} />
      <Route path="crear" element={<ProviderForm />} />
      <Route path="editar/:cedula_ruc" element={<ProviderForm editMode />} />
      <Route path="detalles/:cedula_ruc" element={<ProviderDetails />} />
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import InvoiceList from "./components/InvoiceList";

export default function InvoiceModule() {
  return (
    <Routes>
      <Route index element={<InvoiceList />} />
    </Routes>
  );
}

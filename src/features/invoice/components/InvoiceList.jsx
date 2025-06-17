import React, { useEffect, useState } from "react";
import {
  getAllInvoices,
  deleteInvoice,
  getInvoiceDetails,
  getAllProducts,
} from "../invoiceService";
import InvoiceModal from "./InvoiceModal";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import ConfirmModal from "./ConfirmModal";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modales
  const [modalOpen, setModalOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsData, setDetailsData] = useState({});
  const [productos, setProductos] = useState([]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    getAllInvoices()
      .then(setInvoices)
      .finally(() => setLoading(false));
    getAllProducts().then(setProductos);
  }, []);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteInvoice(toDelete.id);
      setInvoices(invoices.filter((f) => f.id !== toDelete.id));
      setConfirmOpen(false);
      setToDelete(null);
      alert("Factura eliminada");
    } catch (err) {
      alert(err.message);
    }
  };

  const openDetails = async (factura) => {
    setDetailsOpen(true);
    const detalles = await getInvoiceDetails(factura.id);
    setDetailsData({ cabecera: factura, detalles });
  };

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Facturas</h2>
        <button
          className="btn-primary"
          onClick={() => {
            setEditInvoice(null);
            setModalOpen(true);
          }}
        >
          + Nueva
        </button>
      </div>
      <InvoiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={(factura) => {
          setModalOpen(false);
          setInvoices((prev) => {
            const idx = prev.findIndex((f) => f.id === factura.id);
            if (idx >= 0) {
              const copy = [...prev];
              copy[idx] = factura;
              return copy;
            }
            return [factura, ...prev];
          });
        }}
        editInvoice={editInvoice}
      />
      <InvoiceDetailsModal
        open={detailsOpen}
        cabecera={detailsData.cabecera}
        detalles={detailsData.detalles}
        productos={productos} // <-- pásalo aquí
        onClose={() => setDetailsOpen(false)}
      />
      <ConfirmModal
        open={confirmOpen}
        message={
          toDelete
            ? `¿Seguro que deseas eliminar la factura "${toDelete.numero_factura}"?`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f4f6fa" }}>
              <th>ID</th>
              <th>Número</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 24 }}>
                  No se encontraron facturas.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.numero_factura}</td>
                  <td>{inv.proveedor_cedula_ruc}</td>
                  <td>{inv.fecha_emision}</td>
                  <td>{inv.total}</td>
                  <td>{inv.estado}</td>
                  <td>
                    <button
                      className="btn-action"
                      title="Ver"
                      onClick={() => openDetails(inv)}
                    >
                      👁️
                    </button>
                    <button
                      className="btn-action"
                      title="Editar"
                      onClick={() => {
                        setEditInvoice(inv);
                        setModalOpen(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-action"
                      title="Eliminar"
                      onClick={() => {
                        setToDelete(inv);
                        setConfirmOpen(true);
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

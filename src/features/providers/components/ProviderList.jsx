import React, { useEffect, useState } from "react";
import { getAllProviders, deleteProvider } from "../providerService";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "./ModalConfirm";
import ModalDetails from "./ModalDetails";

export default function ProviderList() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // Estado para detalles
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsProvider, setDetailsProvider] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllProviders()
      .then((data) => {
        setProviders(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      providers.filter(
        (p) =>
          p.nombre.toLowerCase().includes(s) ||
          p.cedula_ruc.toLowerCase().includes(s)
      )
    );
  }, [search, providers]);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteProvider(toDelete.cedula_ruc);
      setProviders(
        providers.filter((p) => p.cedula_ruc !== toDelete.cedula_ruc)
      );
      setFiltered(filtered.filter((p) => p.cedula_ruc !== toDelete.cedula_ruc));
      setModalOpen(false);
      setToDelete(null);
      alert("Proveedor eliminado");
    } catch (err) {
      alert("Error al eliminar proveedor");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Proveedores</h2>
        <button className="btn-primary" onClick={() => navigate("crear")}>
          + Nuevo
        </button>
      </div>
      <div style={{ position: "relative", marginBottom: 16, maxWidth: 350 }}>
        <input
          type="text"
          placeholder="Buscar por nombre o cédula..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 36px 8px 36px",
            borderRadius: 6,
            border: "1px solid #ccc",
            width: "100%",
            fontSize: 16,
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888",
          }}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>
      <ModalConfirm
        open={modalOpen}
        message={
          toDelete ? `¿Seguro que deseas eliminar a "${toDelete.nombre}"?` : ""
        }
        onConfirm={handleDelete}
        onCancel={() => {
          setModalOpen(false);
          setToDelete(null);
        }}
      />
      <ModalDetails
        open={detailsOpen}
        provider={detailsProvider}
        onClose={() => {
          setDetailsOpen(false);
          setDetailsProvider(null);
        }}
      />
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f4f6fa" }}>
                <th style={th}>Cédula/RUC</th>
                <th style={th}>Nombre</th>
                <th style={th}>Ciudad</th>
                <th style={th}>Tipo</th>
                <th style={th}>Dirección</th>
                <th style={th}>Teléfono</th>
                <th style={th}>Email</th>
                <th style={th}>Estado</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: 24 }}>
                    No se encontraron proveedores.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.cedula_ruc}
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    <td style={td}>{p.cedula_ruc}</td>
                    <td style={td}>{p.nombre}</td>
                    <td style={td}>{p.ciudad}</td>
                    <td style={td}>{p.tipo_proveedor}</td>
                    <td style={td}>{p.direccion}</td>
                    <td style={td}>{p.telefono}</td>
                    <td style={td}>{p.email}</td>
                    <td style={td}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 10px",
                          borderRadius: 12,
                          background: p.estado ? "#d1fae5" : "#fee2e2",
                          color: p.estado ? "#065f46" : "#991b1b",
                          fontWeight: 500,
                          fontSize: 13,
                        }}
                      >
                        {p.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td style={td}>
                      <button
                        className="btn-action"
                        title="Detalles"
                        onClick={() => {
                          setDetailsProvider(p);
                          setDetailsOpen(true);
                        }}
                      >
                        👁️
                      </button>
                      <button
                        className="btn-action"
                        title="Editar"
                        onClick={() => navigate(`editar/${p.cedula_ruc}`)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-action"
                        title="Eliminar"
                        onClick={() => {
                          setToDelete(p);
                          setModalOpen(true);
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
        </div>
      )}
    </div>
  );
}

const th = {
  padding: "10px 8px",
  fontWeight: 600,
  fontSize: 15,
  color: "#222",
  borderBottom: "2px solid #e5e7eb",
  textAlign: "left",
  background: "#f4f6fa",
};

const td = {
  padding: "8px 8px",
  fontSize: 15,
  color: "#222",
  background: "#fff",
};

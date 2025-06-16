import React from "react";

export default function ModalDetails({ open, provider, onClose }) {
  if (!open || !provider) return null;
  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 16 }}>
          Detalles del Proveedor
        </h2>
        <p>
          <b>Cédula/RUC:</b> {provider.cedula_ruc}
        </p>
        <p>
          <b>Nombre:</b> {provider.nombre}
        </p>
        <p>
          <b>Ciudad:</b> {provider.ciudad}
        </p>
        <p>
          <b>Tipo:</b> {provider.tipo_proveedor}
        </p>
        <p>
          <b>Dirección:</b> {provider.direccion}
        </p>
        <p>
          <b>Teléfono:</b> {provider.telefono}
        </p>
        <p>
          <b>Email:</b> {provider.email}
        </p>
        <p>
          <b>Estado:</b> {provider.estado ? "Activo" : "Inactivo"}
        </p>
        <button
          className="btn-primary"
          onClick={onClose}
          style={{ marginTop: 18, minWidth: 100 }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(120deg, rgba(0,0,0,0.4), rgba(37,99,235,0.2))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  borderRadius: 12,
  padding: "32px 28px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  minWidth: 320,
  textAlign: "left",
};

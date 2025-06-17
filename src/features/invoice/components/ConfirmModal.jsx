import React from "react";

export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <p style={{ fontSize: 18, marginBottom: 24 }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button className="btn-primary" onClick={onConfirm}>
            Sí
          </button>
          <button className="btn-action" onClick={onCancel}>
            No
          </button>
        </div>
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
  background: "rgba(0,0,0,0.25)",
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
  textAlign: "center",
};

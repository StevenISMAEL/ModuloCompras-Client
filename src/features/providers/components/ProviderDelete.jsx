import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProviderById, deleteProvider } from "../providerService";

export default function ProviderDelete() {
  const { cedula_ruc } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProviderById(cedula_ruc).then(setProvider);
  }, [cedula_ruc]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProvider(cedula_ruc);
      alert("Proveedor eliminado");
      navigate("..");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!provider) return <div>Cargando...</div>;

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        background: "#fff",
        padding: 24,
        borderRadius: 12,
      }}
    >
      <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 16 }}>
        Eliminar Proveedor
      </h2>
      <p>
        ¿Seguro que deseas eliminar a <b>{provider.nombre}</b>?
      </p>
      <div style={{ marginTop: 18 }}>
        <button
          className="btn-action"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
        <button
          className="btn-action"
          style={{ marginLeft: 12 }}
          onClick={() => navigate("..")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

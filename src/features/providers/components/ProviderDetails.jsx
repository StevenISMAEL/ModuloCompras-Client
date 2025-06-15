import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProviderById } from "../providerService";

export default function ProviderDetails() {
  const { cedula_ruc } = useParams();
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProviderById(cedula_ruc).then(setProvider);
  }, [cedula_ruc]);

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
      <button className="btn-action" onClick={() => navigate("..")}>
        Volver
      </button>
    </div>
  );
}

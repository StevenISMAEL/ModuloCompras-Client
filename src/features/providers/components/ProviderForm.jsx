import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProvider,
  getProviderById,
  updateProvider,
} from "../providerService";

export default function ProviderForm({ editMode }) {
  const [form, setForm] = useState({
    cedula_ruc: "",
    nombre: "",
    ciudad: "",
    tipo_proveedor: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: true,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cedula_ruc } = useParams();

  useEffect(() => {
    if (editMode && cedula_ruc) {
      setLoading(true);
      getProviderById(cedula_ruc)
        .then((data) => setForm(data))
        .finally(() => setLoading(false));
    }
  }, [editMode, cedula_ruc]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Siempre agrega usuario_creacion: 1 al crear
      const dataToSend = { ...form, usuario_creacion: 1 };
      if (editMode) {
        await updateProvider(cedula_ruc, dataToSend);
        alert("Proveedor actualizado");
      } else {
        await createProvider(dataToSend);
        alert("Proveedor creado");
      }
      navigate("..");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 500,
        margin: "0 auto",
        background: "#fff",
        padding: 24,
        borderRadius: 12,
      }}
    >
      <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 16 }}>
        {editMode ? "Editar Proveedor" : "Nuevo Proveedor"}
      </h2>
      <label>Cédula/RUC</label>
      <input
        name="cedula_ruc"
        value={form.cedula_ruc}
        onChange={handleChange}
        required
        disabled={editMode}
        style={inputStyle}
      />
      <label>Nombre</label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <label>Ciudad</label>
      <input
        name="ciudad"
        value={form.ciudad}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <label>Tipo</label>
      <select
        name="tipo_proveedor"
        value={form.tipo_proveedor}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Seleccione...</option>
        <option value="Crédito">Crédito</option>
        <option value="Contado">Contado</option>
      </select>
      <label>Dirección</label>
      <input
        name="direccion"
        value={form.direccion}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <label>Teléfono</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <label>Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        type="email"
        style={inputStyle}
      />
      <label>
        <input
          type="checkbox"
          name="estado"
          checked={form.estado}
          onChange={handleChange}
        />
        Activo
      </label>
      <div style={{ marginTop: 18 }}>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          className="btn-action"
          style={{ marginLeft: 12 }}
          onClick={() => navigate("..")}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: 12,
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16,
};

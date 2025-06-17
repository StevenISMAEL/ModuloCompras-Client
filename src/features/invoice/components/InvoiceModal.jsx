import React, { useEffect, useState } from "react";
import {
  createInvoice,
  getAllProducts,
  getInvoiceDetails,
  updateInvoice,
  getAllProviders,
} from "../invoiceService";

const ESTADOS_VALIDOS = ["Registrada", "Impresa", "Cancelada"];

// Función para obtener la fecha de hoy en formato yyyy-mm-dd
function getToday() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export default function InvoiceModal({ open, onClose, onSaved, editInvoice }) {
  const [cabecera, setCabecera] = useState({
    numero_factura: "",
    numero_factura_proveedor: "",
    fecha_emision: getToday(),
    proveedor_cedula_ruc: "",
    tipo_pago: "Contado",
    subtotal: 0,
    iva: 0,
    total: 0,
    estado: "Registrada",
    observaciones: "",
    usuario_creacion: 1,
  });
  const [detalles, setDetalles] = useState([]);
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Solo se puede editar productos si la factura está en estado Registrada
  const puedeEditarProductos = cabecera.estado === "Registrada";
  // Solo se puede editar cabecera si la factura está en estado Registrada
  const puedeEditarCabecera = !editInvoice || cabecera.estado === "Registrada";

  useEffect(() => {
    if (open) {
      Promise.all([getAllProducts(), getAllProviders()]).then(
        ([productosApi, proveedoresApi]) => {
          setProductos(productosApi);
          setProveedores(proveedoresApi);

          if (editInvoice) {
            setCabecera(editInvoice);
            getInvoiceDetails(editInvoice.id).then((detallesApi) => {
              setDetalles(
                detallesApi.map((d) => {
                  const prod = productosApi.find(
                    (p) => p.id_producto === d.producto_id
                  );
                  return {
                    ...d,
                    nombre_producto: d.nombre_producto || prod?.nombre || "",
                    descripcion_producto:
                      d.descripcion_producto || prod?.descripcion || "",
                  };
                })
              );
            });
          } else {
            setCabecera({
              numero_factura: "",
              numero_factura_proveedor: "",
              fecha_emision: getToday(),
              proveedor_cedula_ruc: "",
              tipo_pago: "Contado",
              subtotal: 0,
              iva: 0,
              total: 0,
              estado: "Registrada",
              observaciones: "",
              usuario_creacion: 1,
            });
            setDetalles([]);
          }
        }
      );
    }
    // eslint-disable-next-line
  }, [open, editInvoice]);

  // Filtrar detalles por factura_id si editInvoice existe (parche frontend)
  const detallesFiltrados =
    editInvoice && detalles.length > 0
      ? detalles.filter((d) => d.factura_id === editInvoice.id)
      : detalles;

  // Calcular totales SOLO con los detalles visibles
  useEffect(() => {
    let subtotal = 0,
      iva = 0,
      total = 0;
    detallesFiltrados.forEach((d) => {
      subtotal += Number(d.subtotal || 0);
      iva += Number(d.iva || 0);
      total += Number(d.total || 0);
    });
    setCabecera((c) => ({ ...c, subtotal, iva, total }));
    // eslint-disable-next-line
  }, [detallesFiltrados]);

  const handleCabeceraChange = (e) => {
    const { name, value } = e.target;
    setCabecera((c) => ({ ...c, [name]: value }));
  };

  const handleDetalleChange = (idx, field, value) => {
    setDetalles((prev) =>
      prev.map((d, i) => {
        if (i !== idx) return d;
        let updated = { ...d, [field]: value };
        if (field === "producto_id") {
          const prod = productos.find((p) => p.id_producto === value);
          updated.nombre_producto = prod?.nombre || "";
          updated.descripcion_producto = prod?.descripcion || "";
          updated.precio_unitario = Number(prod?.precio_unitario || 0);
          updated.cantidad = 1;
          updated.aplica_iva = false;
          updated.subtotal = Number(prod?.precio_unitario || 0);
          updated.iva = 0;
          updated.total = Number(prod?.precio_unitario || 0);
        }
        if (
          field === "cantidad" ||
          field === "precio_unitario" ||
          field === "aplica_iva"
        ) {
          const cantidad = field === "cantidad" ? value : updated.cantidad || 1;
          const precio_unitario =
            field === "precio_unitario" ? value : updated.precio_unitario || 0;
          const aplica_iva =
            field === "aplica_iva" ? value : updated.aplica_iva;
          updated.subtotal = cantidad * precio_unitario;
          updated.iva = aplica_iva ? cantidad * precio_unitario * 0.12 : 0;
          updated.total = aplica_iva
            ? cantidad * precio_unitario * 1.12
            : cantidad * precio_unitario;
        }
        return updated;
      })
    );
  };

  const handleAddDetalle = () => {
    setDetalles((prev) => [
      ...prev,
      {
        producto_id: "",
        nombre_producto: "",
        descripcion_producto: "",
        cantidad: 1,
        precio_unitario: 0,
        aplica_iva: false,
        subtotal: 0,
        iva: 0,
        total: 0,
        usuario_creacion: 1,
        fecha_creacion: new Date().toISOString(),
      },
    ]);
  };

  const handleRemoveDetalle = (idx) => {
    setDetalles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ESTADOS_VALIDOS.includes(cabecera.estado)) {
      alert(
        "Estado inválido. Solo se permite: Registrada, Impresa o Cancelada."
      );
      return;
    }
    setLoading(true);

    // Asegura nombre y descripción del producto en cada detalle antes de guardar
    const detallesConNombre = detallesFiltrados.map((d) => {
      const prod = productos.find((p) => p.id_producto === d.producto_id);
      return {
        ...d,
        nombre_producto: prod ? prod.nombre : d.nombre_producto || "",
        descripcion_producto: prod
          ? prod.descripcion
          : d.descripcion_producto || "",
      };
    });

    try {
      if (editInvoice) {
        await updateInvoice(editInvoice.id, cabecera, detallesConNombre);
        alert("Factura actualizada");
        onSaved({ ...cabecera, id: editInvoice.id });
      } else {
        const { id, ...cabeceraSinId } = cabecera;
        const factura = await createInvoice(cabeceraSinId, detallesConNombre);
        alert("Factura creada");
        onSaved(factura);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div style={backdropStyle}>
      <form
        onSubmit={handleSubmit}
        style={{
          ...modalStyle,
          maxWidth: 700,
          minWidth: 400,
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 24 }}>
          {editInvoice ? "Editar Factura" : "Nueva Factura"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={labelStyle}>Número Factura</label>
            <input
              name="numero_factura"
              value={cabecera.numero_factura}
              onChange={handleCabeceraChange}
              required
              style={inputStyle}
              disabled={!!editInvoice}
            />
          </div>
          <div>
            <label style={labelStyle}>Número Proveedor</label>
            <input
              name="numero_factura_proveedor"
              value={cabecera.numero_factura_proveedor}
              onChange={handleCabeceraChange}
              required
              style={inputStyle}
              disabled={!!editInvoice}
            />
          </div>
          <div>
            <label style={labelStyle}>Fecha Emisión</label>
            <input
              name="fecha_emision"
              type="date"
              value={cabecera.fecha_emision}
              onChange={handleCabeceraChange}
              required
              style={inputStyle}
              disabled={!!editInvoice}
            />
          </div>
          <div>
            <label style={labelStyle}>Proveedor (Cédula/RUC)</label>
            <select
              name="proveedor_cedula_ruc"
              value={cabecera.proveedor_cedula_ruc}
              onChange={handleCabeceraChange}
              required
              style={inputStyle}
              disabled={!puedeEditarCabecera}
            >
              <option value="">Seleccione proveedor...</option>
              {proveedores.map((p) => (
                <option key={p.cedula_ruc} value={p.cedula_ruc}>
                  {p.nombre} ({p.cedula_ruc})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tipo Pago</label>
            <select
              name="tipo_pago"
              value={cabecera.tipo_pago}
              onChange={handleCabeceraChange}
              style={inputStyle}
              disabled={!puedeEditarCabecera}
            >
              <option value="Contado">Contado</option>
              <option value="Crédito">Crédito</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Estado</label>
            <select
              name="estado"
              value={cabecera.estado}
              onChange={handleCabeceraChange}
              style={inputStyle}
              required
            >
              <option value="Registrada">Registrada</option>
              <option value="Impresa">Impresa</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Observaciones</label>
          <textarea
            name="observaciones"
            value={cabecera.observaciones}
            onChange={handleCabeceraChange}
            style={{ ...inputStyle, minHeight: 40 }}
          />
        </div>
        <h3 style={{ marginTop: 18, marginBottom: 12 }}>
          Detalle de Productos
        </h3>
        <button
          type="button"
          className="btn-primary"
          onClick={handleAddDetalle}
          style={{ marginBottom: 12 }}
          disabled={!puedeEditarProductos}
        >
          + Agregar Producto
        </button>
        <div>
          {detallesFiltrados.map((d, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <select
                value={d.producto_id}
                onChange={(e) =>
                  handleDetalleChange(idx, "producto_id", e.target.value)
                }
                required
                style={{ ...inputStyle, width: 140 }}
                disabled={!puedeEditarProductos}
              >
                <option value="">Producto...</option>
                {productos.map((p) => (
                  <option key={p.id_producto} value={p.id_producto}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              {d.descripcion_producto && (
                <span style={{ fontSize: 13, color: "#888", minWidth: 70 }}>
                  {d.descripcion_producto}
                </span>
              )}
              <input
                type="number"
                min={1}
                value={d.cantidad}
                onChange={(e) =>
                  handleDetalleChange(idx, "cantidad", Number(e.target.value))
                }
                style={{ ...inputStyle, width: 60 }}
                placeholder="Cantidad"
                disabled={!puedeEditarProductos}
              />
              <input
                type="number"
                value={d.precio_unitario}
                onChange={(e) =>
                  handleDetalleChange(
                    idx,
                    "precio_unitario",
                    Number(e.target.value)
                  )
                }
                style={{ ...inputStyle, width: 80 }}
                placeholder="Precio"
                disabled={!puedeEditarProductos}
              />
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={d.aplica_iva}
                  onChange={(e) =>
                    handleDetalleChange(idx, "aplica_iva", e.target.checked)
                  }
                  disabled={!puedeEditarProductos}
                  style={{ marginRight: 4 }}
                />
                IVA
              </label>
              <span style={{ minWidth: 80 }}>Subtotal: {d.subtotal}</span>
              <span style={{ minWidth: 60 }}>IVA: {d.iva}</span>
              <span style={{ minWidth: 80 }}>Total: {d.total}</span>
              <button
                type="button"
                className="btn-action"
                onClick={() => handleRemoveDetalle(idx)}
                disabled={!puedeEditarProductos}
                style={{
                  fontSize: 22,
                  color: "#e74c3c",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                title="Eliminar producto"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, fontWeight: 600, marginBottom: 16 }}>
          Subtotal: {cabecera.subtotal} | IVA: {cabecera.iva} | Total:{" "}
          {cabecera.total}
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "flex-end",
            gap: 16,
          }}
        >
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button className="btn-action" type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
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
  textAlign: "left",
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: 0,
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 15,
};

const labelStyle = {
  fontWeight: 500,
  marginBottom: 6,
  display: "block",
};

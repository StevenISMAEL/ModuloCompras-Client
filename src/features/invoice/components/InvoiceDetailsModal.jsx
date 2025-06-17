import React from "react";

export default function InvoiceDetailsModal({
  open,
  cabecera,
  detalles,
  productos = [],
  onClose,
}) {
  if (!open || !cabecera) return null;

  // Filtrar detalles por factura_id (parche frontend)
  const detallesFiltrados = (detalles || []).filter(
    (d) => d.factura_id === cabecera.id
  );

  // Función para obtener el nombre del producto
  const getNombreProducto = (d) => {
    if (d.nombre_producto && d.nombre_producto.trim() !== "")
      return d.nombre_producto;
    const prod = productos.find((p) => p.id_producto === d.producto_id);
    return prod ? prod.nombre : d.producto_id;
  };

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 16 }}>
          Detalles de Factura
        </h2>
        <div>
          <b>Número:</b> {cabecera.numero_factura}
          <br />
          <b>Proveedor:</b> {cabecera.proveedor_cedula_ruc}
          <br />
          <b>Fecha:</b> {cabecera.fecha_emision}
          <br />
          <b>Tipo Pago:</b> {cabecera.tipo_pago}
          <br />
          <b>Estado:</b> {cabecera.estado}
          <br />
          <b>Observaciones:</b> {cabecera.observaciones}
        </div>
        <h3 style={{ marginTop: 18 }}>Productos</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>IVA</th>
              <th>Subtotal</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {detallesFiltrados.length > 0 ? (
              detallesFiltrados.map((d, i) => (
                <tr key={i}>
                  <td>{getNombreProducto(d)}</td>
                  <td>{d.cantidad}</td>
                  <td>{d.precio_unitario}</td>
                  <td>{d.aplica_iva ? "Sí" : "No"}</td>
                  <td>{d.subtotal}</td>
                  <td>{d.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Sin productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: 18, textAlign: "right" }}>
          <b>Subtotal:</b> {cabecera.subtotal} <br />
          <b>IVA:</b> {cabecera.iva} <br />
          <b>Total:</b> {cabecera.total}
        </div>
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

const API_FACTURAS =
  "https://modulocompras-production-843f.up.railway.app/api/facturas";
const API_DETALLES =
  "https://modulocompras-production-843f.up.railway.app/api/detalles-factura";
const API_PRODUCTOS =
  "https://adapi-production-16e6.up.railway.app/api/v1/productos/";
const API_PROVEEDORES =
  "https://modulocompras-production-843f.up.railway.app/api/proveedores";

const ESTADOS_VALIDOS = ["Registrada", "Impresa", "Cancelada"];

export const getAllInvoices = async () => {
  const res = await fetch(API_FACTURAS);
  if (!res.ok) throw new Error("Error al obtener facturas");
  return await res.json();
};

export const getInvoiceDetails = async (factura_id) => {
  // Solo trae los detalles de la factura seleccionada
  const res = await fetch(`${API_DETALLES}?factura_id=${factura_id}`);
  if (!res.ok) throw new Error("Error al obtener detalles");
  return await res.json();
};

export const getAllProducts = async () => {
  const res = await fetch(API_PRODUCTOS);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
};

export const getAllProviders = async () => {
  const res = await fetch(API_PROVEEDORES);
  if (!res.ok) throw new Error("Error al obtener proveedores");
  return await res.json();
};

export const createInvoice = async (cabecera, detalles) => {
  if (!ESTADOS_VALIDOS.includes(cabecera.estado)) {
    throw new Error(
      "Estado inválido. Solo se permite: Registrada, Impresa o Cancelada."
    );
  }

  const { id, fecha_modificacion, usuario_modificacion, ...cabeceraToSend } =
    cabecera;

  // 1. Crear cabecera
  const resCab = await fetch(API_FACTURAS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cabeceraToSend),
  });
  if (!resCab.ok) {
    const msg = await resCab.text();
    throw new Error("Error al crear factura: " + msg);
  }
  const factura = await resCab.json();

  // 2. Crear detalles (uno por uno)
  for (const det of detalles) {
    const { id, ...detalleToSend } = det;
    await fetch(API_DETALLES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...detalleToSend,
        factura_id: factura.id,
        usuario_creacion: 1,
        fecha_creacion: new Date().toISOString(),
      }),
    });
  }
  return factura;
};

export const updateInvoice = async (id, cabecera, detalles) => {
  if (!ESTADOS_VALIDOS.includes(cabecera.estado)) {
    throw new Error(
      "Estado inválido. Solo se permite: Registrada, Impresa o Cancelada."
    );
  }
  const resCab = await fetch(`${API_FACTURAS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cabecera),
  });
  if (!resCab.ok) throw new Error("Error al actualizar factura");

  // Opcional: actualizar detalles si tu backend lo requiere
  // for (const det of detalles) { ... }

  return await resCab.json();
};

export const deleteInvoice = async (id) => {
  const res = await fetch(`${API_FACTURAS}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar factura");
  return await res.json();
};

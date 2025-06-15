const API_URL =
  "https://modulocompras-production-843f.up.railway.app/api/proveedores";

export const getAllProviders = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener proveedores");
  return await response.json();
};

export const getProviderById = async (cedula_ruc) => {
  const response = await fetch(`${API_URL}/${cedula_ruc}`);
  if (!response.ok) throw new Error("Proveedor no encontrado");
  return await response.json();
};

export const createProvider = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al crear proveedor");
  return await response.json();
};

export const updateProvider = async (cedula_ruc, data) => {
  const response = await fetch(`${API_URL}/${cedula_ruc}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al actualizar proveedor");
  return await response.json();
};

export const deleteProvider = async (cedula_ruc) => {
  const response = await fetch(`${API_URL}/${cedula_ruc}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar proveedor");
  return await response.json();
};

// client/src/services/productService.js

// Esta es la URL completa de la API externa de Inventario
const INVENTORY_API_URL = 'https://adapi-production-16e6.up.railway.app/api/v1/productos/';

/**
 * Obtiene todos los productos desde la API de Inventario.
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(INVENTORY_API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los productos del inventario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    throw error; // Relanzamos para que el componente lo maneje
  }
};
// client/src/services/providerService.js

// La URL base de nuestra API la manejará el proxy de Vite que configuramos.
const API_URL = '/api/proveedores';

/**
 * Obtiene todos los proveedores desde la API.
 */
export const getAllProviders = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los proveedores');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAllProviders:", error);
    // Relanzamos el error para que el componente que llama lo pueda manejar.
    throw error;
  }
};

// Aquí añadiremos luego las funciones para crear, actualizar y eliminar.
// export const createProvider = async (provider) => { ... };
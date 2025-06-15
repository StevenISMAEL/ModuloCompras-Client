const API_URL = '/api/proveedores'

   export const getAllProviders = async () => {
     try {
       const response = await fetch(API_URL)
       if (!response.ok) throw new Error('Error al obtener proveedores')
       return await response.json()
     } catch (error) {
       console.error('Error en getAllProviders:', error)
       throw error
     }
   }

   export const getProviderById = async (cedula_ruc) => {
     try {
       const response = await fetch(`${API_URL}/${cedula_ruc}`)
       if (!response.ok) throw new Error('Proveedor no encontrado')
       return await response.json()
     } catch (error) {
       console.error('Error en getProviderById:', error)
       throw error
     }
   }
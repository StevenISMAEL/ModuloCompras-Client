import { useEffect, useState } from 'react'
   import { getAllProviders } from './providerService'
   import ProviderList from './components/ProviderList'

   function Proveedores() {
     const [providers, setProviders] = useState([])
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     useEffect(() => {
       const fetchData = async () => {
         try {
           const data = await getAllProviders()
           setProviders(data)
         } catch (err) {
           setError(err.message)
         } finally {
           setLoading(false)
         }
       }
       fetchData()
     }, [])

     if (loading) return <p className="text-blue-dark">Cargando...</p>
     if (error) return <p className="text-red-600">Error: {error}</p>

     return (
       <div className="bg-white p-6 rounded-lg shadow">
         <h2 className="text-2xl font-bold text-blue-dark mb-4">Lista de Proveedores</h2>
         <ProviderList providers={providers} />
       </div>
     )
   }

   export default Proveedores
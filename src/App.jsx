import { Outlet, Link } from 'react-router-dom'

   function App() {
     return (
       <div className="flex h-screen bg-gray-light">
         {/* Menú Lateral */}
         <nav className="w-64 bg-blue-dark text-white p-4">
           <h1 className="text-2xl font-bold mb-6">Modulo Compras</h1>
           <ul>
             <li className="mb-2"><Link to="/" className="hover:underline">Home</Link></li>
             <li className="mb-2"><Link to="/proveedores" className="hover:underline">Proveedores</Link></li>
             <li className="mb-2"><Link to="/facturas" className="hover:underline">Facturas</Link></li>
             <li className="mb-2"><Link to="/detalles-factura" className="hover:underline">Detalles Factura</Link></li>
             <li className="mb-2"><Link to="/pagos" className="hover:underline">Pagos</Link></li>
             <li className="mb-2"><Link to="/auditoria" className="hover:underline">Auditoría</Link></li>
             <li className="mb-2"><Link to="/saldos" className="hover:underline">Saldos</Link></li>
             <li className="mb-2"><Link to="/configuracion" className="hover:underline">Configuración</Link></li>
             <li className="mb-2"><Link to="/tokens" className="hover:underline">Tokens</Link></li>
           </ul>
         </nav>
         {/* Contenido Principal */}
         <main className="flex-1 p-6">
           <Outlet />
         </main>
       </div>
     )
   }

   export default App
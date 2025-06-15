import { Route, Routes } from 'react-router-dom'
   import Home from './features/Home'
   import Proveedores from './features/providers/index.jsx'
   import Facturas from './features/facturas/index.jsx'
   import DetallesFactura from './features/detallesFactura/index.jsx'
   import Pagos from './features/pagos/index.jsx'
   import Auditoria from './features/auditoria/index.jsx'
   import Saldos from './features/saldos/index.jsx'
   import Configuracion from './features/configuracion/index.jsx'
   import Tokens from './features/tokens/index.jsx'

   function AppRoutes() {
     return (
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/proveedores" element={<Proveedores />} />
         <Route path="/facturas" element={<Facturas />} />
         <Route path="/detalles-factura" element={<DetallesFactura />} />
         <Route path="/pagos" element={<Pagos />} />
         <Route path="/auditoria" element={<Auditoria />} />
         <Route path="/saldos" element={<Saldos />} />
         <Route path="/configuracion" element={<Configuracion />} />
         <Route path="/tokens" element={<Tokens />} />
       </Routes>
     )
   }

   export default AppRoutes
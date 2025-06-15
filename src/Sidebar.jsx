import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">Modulo Compras</div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/proveedores"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Proveedores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/facturas"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Facturas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pagos"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Pagos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saldos"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Saldos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auditoria"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Auditoría
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/configuracion"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Configuración
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tokens"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Tokens
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">© 2025 ComprasApp</div>
    </aside>
  );
}

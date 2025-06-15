import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: 24 }}>
        Bienvenido al Módulo de Compras
      </h2>
      <p style={{ fontSize: 18, color: "#444", marginBottom: 32 }}></p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          maxWidth: 900,
        }}
      >
        <div className="card">
          <div className="card-icon" style={{ fontSize: 40, marginBottom: 12 }}>
            📦
          </div>
          <div
            className="card-title"
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 6,
              color: "#2563eb",
            }}
          >
            Proveedores
          </div>
          <div
            className="card-desc"
            style={{ color: "#555", marginBottom: 10 }}
          >
            Gestiona tus proveedores.
          </div>
          <Link
            to="/proveedores"
            className="card-link"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Ver más
          </Link>
        </div>
        <div className="card">
          <div className="card-icon" style={{ fontSize: 40, marginBottom: 12 }}>
            🧾
          </div>
          <div
            className="card-title"
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 6,
              color: "#2563eb",
            }}
          >
            Facturas
          </div>
          <div
            className="card-desc"
            style={{ color: "#555", marginBottom: 10 }}
          >
            Consulta y administra facturas.
          </div>
          <Link
            to="/facturas"
            className="card-link"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Ver más
          </Link>
        </div>
        <div className="card">
          <div className="card-icon" style={{ fontSize: 40, marginBottom: 12 }}>
            💳
          </div>
          <div
            className="card-title"
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 6,
              color: "#2563eb",
            }}
          >
            Pagos
          </div>
          <div
            className="card-desc"
            style={{ color: "#555", marginBottom: 10 }}
          >
            Revisa y gestiona pagos.
          </div>
          <Link
            to="/pagos"
            className="card-link"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

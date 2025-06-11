// client/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/proveedores')
      .then(response => {
        if (!response.ok) throw new Error('La respuesta de la red no fue correcta');
        return response.json();
      })
      .then(data => {
        setProviders(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Módulo de Compras</h1>
      <h2>Lista de Proveedores desde la API</h2>

      {loading && <p>Cargando proveedores...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <table className="providers-table">
          <thead>
            <tr>
              <th>Cédula/RUC</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(provider => (
              <tr key={provider.cedula_ruc}>
                <td>{provider.cedula_ruc}</td>
                <td>{provider.nombre}</td>
                <td>{provider.ciudad}</td>
                <td>{provider.tipo}</td>
                <td>{provider.direccion}</td>
                <td>{provider.telefono}</td>
                <td>{provider.email}</td>
                <td className={provider.estado === 'activo' ? 'activo' : 'inactivo'}>
                  {provider.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

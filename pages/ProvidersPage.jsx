// client/src/pages/ProvidersPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllProviders } from '../services/providerService';
import ProviderList from '../components/ProviderList';

const ProvidersPage = () => {
  // Estado para almacenar la lista de proveedores
  const [providers, setProviders] = useState([]);
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar cualquier error
  const [error, setError] = useState(null);

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getAllProviders();
        setProviders(data);
      } catch (err) {
        setError('No se pudieron cargar los proveedores. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []); // El array vacío asegura que se ejecute solo una vez

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
};

export default ProvidersPage;
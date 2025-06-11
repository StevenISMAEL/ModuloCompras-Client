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
    <div className="providers-page">
      <h1>Gestión de Proveedores</h1>
      <div className="toolbar">
        <button className="btn-new">+ Nuevo Proveedor</button>
        {/* Aquí irán los filtros más adelante */}
      </div>

      {loading && <p>Cargando proveedores...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <ProviderList providers={providers} />}
    </div>
  );
};

export default ProvidersPage;
import React from 'react';

const ProviderList = ({ providers }) => {
  if (providers.length === 0) {
    return <div>No se encontraron proveedores.</div>;
  }

  return (
    <table className="providers-table">
      <thead>
        <tr>
          <th>Cédula/RUC</th>
          <th>Nombre</th>
          <th>Ciudad</th>
          <th>Tipo</th>
          <th>Email</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {providers.map((provider) => (
          <tr key={provider.cedula_ruc}>
            <td>{provider.cedula_ruc}</td>
            <td>{provider.nombre}</td>
            <td>{provider.ciudad}</td>
            <td>{provider.tipo_proveedor}</td>
            <td>{provider.email}</td>
            <td className={provider.estado ? 'activo' : 'inactivo'}>
              {provider.estado ? 'Activo' : 'Inactivo'}
            </td>
            <td>
              <button>✏️ Editar</button>
              <button>🗑️ Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProviderList;
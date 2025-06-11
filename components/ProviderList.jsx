// client/src/components/ProviderList.jsx
import React from 'react';

const ProviderList = ({ providers }) => {
  // Si no hay proveedores, muestra un mensaje.
  if (providers.length === 0) {
    return <p>No se encontraron proveedores.</p>;
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
            <td>{provider.estado ? 'Activo' : 'Inactivo'}</td>
            <td>
              <button className="btn-edit">✏️ Editar</button>
              <button className="btn-delete">🗑️ Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProviderList;
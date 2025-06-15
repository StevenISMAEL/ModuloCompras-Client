import React from 'react';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No se encontraron productos en el inventario.</div>;
  }

  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Nombre</th>
          <th>Precio Unitario</th>
          <th>Descripción</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id_producto}>
            <td>{product.id_producto}</td>
            <td>{product.nombre}</td>
            <td>${parseFloat(product.precio_unitario).toFixed(2)}</td>
            <td>{product.descripcion}</td>
            <td>
              <button>Seleccionar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
// client/src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllProducts } from './productService';
import ProductList from './components/ProductList';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('No se pudieron cargar los productos del inventario.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page"> {/* Puedes usar estilos similares a los de proveedores */}
      <h1>Lista de Productos del módulo Inventario</h1>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </div>
  );
};

export default ProductsPage;
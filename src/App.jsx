import './App.css';
import ProvidersPage from '../pages/ProvidersPage';
import ProductsPage from '../pages/ProductsPage';

function App() {
  return (
    <div className="container">
      <h1>Módulo de Compras</h1>
      <hr />
      <ProvidersPage />
      <hr />
      <ProductsPage />
    </div>
  );
}

export default App;
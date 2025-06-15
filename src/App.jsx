import './App.css';
import ProvidersPage from './features/providers'; 
import ProductsPage from './features/products'; 
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
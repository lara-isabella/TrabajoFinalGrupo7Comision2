// src/App.jsx
import { ProductoProvider } from './context/ProductoContext';
import AppRoutes from './router/AppRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <ProductoProvider>
        <Navbar />
        <AppRoutes />
    </ProductoProvider>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { ProductoProvider } from "./context/ProductoContext";
import AppRoutes from "./components/rutas/AppRoutes";
import Navbar from "./components/comunes/navBar";

function App() {
  return (
    <ProductoProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ProductoProvider>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { ProductoProvider } from "./context/ProductoContext";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./components/rutas/AppRoutes";
import Navbar from "./components/comunes/navBar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductoProvider>
          <div style={{
            backgroundColor: "#fff5f4",
            minHeight: "100vh",
            paddingBottom: "40px"
          }}>
            <Navbar />
            <AppRoutes />
          </div>
        </ProductoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

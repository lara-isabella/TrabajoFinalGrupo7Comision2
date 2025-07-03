import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ProductoContext } from "../../context/ProductoContext";

function PrivateRoute({ children }) {
  const { autenticado } = useContext(ProductoContext);

  return autenticado ? children : <Navigate to="/" />;
}

export default PrivateRoute;

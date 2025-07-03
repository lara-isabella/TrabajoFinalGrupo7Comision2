import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function PrivateRoute({ children }) {
  const { autenticado } = useContext(AuthContext);

  return autenticado ? children : <Navigate to="/" />;
}

export default PrivateRoute;
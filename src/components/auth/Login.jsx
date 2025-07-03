import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductoContext } from "../../context/ProductoContext";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setAutenticado } = useContext(ProductoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Formulario enviado");

    // Validación básica
    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }
    if (pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Guardar usuario (opcional)
    sessionStorage.setItem("userEmail", email);

    // Autenticar y redirigir
    setAutenticado(true);
    navigate("/inicio");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="pass"
            className="form-control"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="******"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

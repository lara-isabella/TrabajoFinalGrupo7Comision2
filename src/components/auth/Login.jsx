import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductoContext } from "../../context/ProductoContext";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setAutenticado, setUserEmail } = useContext(ProductoContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }
    if (pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Obtener usuarios guardados
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar usuario por correo y contraseña
    const userFound = users.find((u) => u.email === email && u.pass === pass);

    if (!userFound) {
      setError("Credenciales inválidas");
      return;
    }

    // Si todo está bien, autenticar
    setError("");
    setAutenticado(true);
    setUserEmail(userFound.email);
    localStorage.setItem("sessionUser", JSON.stringify({ email: userFound.email })); // Guarda sesión
    navigate("/"); // Redirige a Home
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

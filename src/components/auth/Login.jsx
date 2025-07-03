import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUserData } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      return setError("Email inválido");
    }
    if (pass.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (u) => u.email === email && u.password === pass
    );

    if (!userFound) {
      return setError("Credenciales inválidas");
    }

    setError("");
    setUserData({
      email: userFound.email,
      nombre: userFound.nombre,
      rol: userFound.rol,
    });

    navigate("/"); // o "/inicio"
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

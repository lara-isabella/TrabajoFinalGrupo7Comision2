import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Correo electrónico inválido");
      return;
    }
    if (pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (pass !== confirmPass) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const newUser = { email, pass };
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(u => u.email === email);
    if (exists) {
      setError("Este correo ya está registrado");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    setSuccess("Registro exitoso! Redirigiendo a login...");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registro de Usuario</h2>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
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
          <label htmlFor="pass" className="form-label">Contraseña</label>
          <input
            type="password"
            id="pass"
            className="form-control"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="******"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPass" className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPass"
            className="form-control"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="******"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </div>
      </form>
    </div>
  );
}

export default Registro;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();
    setError('');

    if (nombre.trim().length < 2) return setError('Nombre demasiado corto');
    if (!email.includes('@')) return setError('Email inválido');
    if (pass.length < 6) return setError('Contraseña mínimo 6 caracteres');
    if (pass !== pass2) return setError('Las contraseñas no coinciden');

    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const yaExiste = usuarios.find(u => u.email === email);
    if (yaExiste) return setError('Ese email ya está registrado');

    const rol = email === 'admin@example.com' ? 'admin' : 'user';
    usuarios.push({ nombre, email, password: pass, rol });
    localStorage.setItem('users', JSON.stringify(usuarios));
    alert('Registro exitoso. Ahora podés iniciar sesión.');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleRegistro} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Nombre completo</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            className="form-control"
            value={pass2}
            onChange={e => setPass2(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">Registrarme</button>
      </form>
    </div>
  );
}

export default Registro;

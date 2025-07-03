import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) return setError('Email inválido.');
    if (pass.length < 6) return setError('Contraseña mínima 6 caracteres.');
    if (pass !== confirmar) return setError('Las contraseñas no coinciden.');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      return setError('Este correo ya está registrado.');
    }

    const nuevoUsuario = { email, pass };
    users.push(nuevoUsuario);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso. Iniciá sesión.');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={pass}
            onChange={(e) => setPass(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Confirmar Contraseña</label>
          <input type="password" className="form-control" value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Registrarme</button>
      </form>
    </div>
  );
}

export default Registro;

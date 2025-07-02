import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductoContext } from './ProductoContext';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAutenticado } = useContext(ProductoContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      return setError('Email inválido');
    }
    if (pass.length < 6) {
      return setError('Contraseña mínima 6 caracteres');
    }
setAutenticado(true);
localStorage.setItem('isAutenticated', true); 
navigate('/inicio');

  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
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
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;

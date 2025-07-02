import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductoContext } from './ProductoContext';

function Login() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { autenticado, setAutenticado, setUsuarioActivo } = useContext(ProductoContext);

  useEffect(() => {
    if (autenticado) {
      navigate('/inicio');
    }
  }, [autenticado, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!nombre.trim()) {
      setLoading(false);
      return setError('Debe ingresar el nombre');
    }
    if (!email.includes('@')) {
      setLoading(false);
      return setError('Email inválido');
    }
    if (pass1.length < 6) {
      setLoading(false);
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
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={pass1}
            onChange={(e) => {
              setPass1(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={pass2}
            onChange={(e) => {
              setPass2(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <div className="text-center mt-3">
        <p>¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
      </div>
    </div>
  );
}

export default Login;


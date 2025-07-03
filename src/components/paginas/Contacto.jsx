import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

function Contacto() {
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEnviado(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="container mt-5 py-4 rounded" style={{ backgroundColor: "#fffde7" }}>
      <h2 className="text-center mb-4" style={{ color: "#1a9ed6", fontFamily: "Pacifico, cursive" }}>
        Contacto
      </h2>

      <p className="fs-5 text-center mb-4" style={{ fontWeight: "500" }}>
        Si deseas comunicarte con nosotros, completa el siguiente formulario o utiliza los datos de contacto proporcionados.
      </p>

      {enviado && (
        <div className="alert alert-success text-center" role="alert">
          ¡Tu mensaje se envió correctamente!
        </div>
      )}

      <div className="row">
        {/* Formulario de contacto */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingresa tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="nombre@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                id="mensaje"
                rows="4"
                placeholder="Escribí tu mensaje aquí"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#1a9ed6",
                borderColor: "#1a9ed6",
                borderRadius: "20px",
                padding: "0.5rem 1.5rem",
                fontWeight: "600"
              }}
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Información de contacto */}
        <div className="col-md-6">
          <h5 style={{ color: "#1a9ed6", fontWeight: "600" }}>Datos de contacto</h5>
          <p><strong>Correo:</strong> somos@sunnybunny.com</p>
          <p><strong>Teléfono:</strong> +54 9 388 123 4567</p>
          <p><strong>Dirección:</strong> San Martin 777, San Salvador de Jujuy, Argentina</p>
          <div className="mt-4 d-flex justify-content-center">
            <img src={logo} alt="Logo Sunny Bunny" style={{ width: "150px" }} />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <Link
          className="btn btn-warning"
          style={{ backgroundColor: "#f7e94a", borderRadius: "20px", fontWeight: "600" }}
          to="/"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default Contacto;

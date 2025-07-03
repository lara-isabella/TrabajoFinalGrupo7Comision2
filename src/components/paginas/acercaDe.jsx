import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logogrupo7-removebg.png";

function AcercaDe() {
  return (
    <div className="container mt-5" style={{ backgroundColor: "#fff0f6" }}>
      <h2 className="text-center" style={{ color: "#cc3366" }}>Acerca de este sitio</h2>
      <p className="mt-3 fs-5">
        Esta es una aplicación React para administrar una lista de productos.
      </p>
      <p className="fs-5">
        En este trabajo estamos aplicando los conocimientos adquiridos durante la cursada de la materia Programacion Visual.
      </p>

      <div className="container mt-5 rounded" style={{ backgroundColor: "white" }}>
        <div className="row">
          <div className="col-md-6 rounded">
                <p className="fs-5 text-center"><strong>React + Vite</strong></p>
                <div className="row">
                    <div className="col-md-3 rounded">
                        <p>
                            Vite es una herramienta de desarrollo frontend para aplicaciones web. 
                        </p>
                        <p>
                            Tiene como objetivo proporcionar una experiencia de desarrollo más rápida y ágil para proyectos web modernos. Vite es una herramienta con principios sólidos e incluye una configuración predeterminada práctica. Ofrece numerosas mejoras con respecto a las importaciones para admitir diversas funciones típicas de las configuraciones basadas en paquetes. La compatibilidad con frameworks y la integración con otras herramientas se pueden realizar mediante plugins. La sección de configuración explica cómo adaptar Vite a su proyecto si es necesario.
                        </p>
                        <p>
                            Extraido de: <a href="https://vite.dev/guide/" target="_blank" rel="noopener noreferrer">vite.dev</a>
                        </p>
                    </div>
                    <div className="col-md-3 rounded">
                        <p>
                            React es una biblioteca para interfaces de usuario web. 
                        </p>
                        <p>
                            Los componentes de React reciben datos y devuelven lo que debería aparecer en la pantalla. Puedes pasarles nuevos datos en respuesta a una interacción, como cuando el usuario escribe en una entrada. React actualizará la pantalla para que coincida con los nuevos datos. Se puede añadir React a tu página y renderizar componentes interactivos de React en cualquier parte de ella.
                        </p>
                        <p>
                            Extraido de: <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">react.dev</a>
                        </p>
                    </div>
                </div>
          </div>
          <div className="col-md-6 rounded">
            <p className="fs-5- text-center"><strong>JavaScript</strong></p>
            <p>

            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 rounded">
            <p className="fs-5 text-center"><strong>React Router</strong></p>
            <p>
              React Router es una colección de componentes para navegación, que puedes integrar en tus apps de React. Con esta colección de componentes puedes modificar la URL de tu página web, reemplazar componentes dependiendo de la dirección en la que se encuentre el usuario y mucho más.
            </p>
            <p>
              Extraído de: <a href="https://codigofacilito.com/articulos/react-router-spa" target="_blank" rel="noopener noreferrer">codigofacilito.com</a>
            </p>
          </div>
          <div className="col-md-6 rounded">
            <p className="fs-5 text-center"><strong>Bootstrap</strong></p>
            <p>
              Bootstrap es un potente conjunto de herramientas frontend repleto de funcionalidades que nos ayudan a, como principalmente aplicamos en este trabajo, moldear la apariencia de nuestra página en base a una estructura principalmente basada en contenedores con columnas y filas.
            </p>
            <p>
              Un framework es una estructura sobre la que se puede desarrollar software. Sirve como base, por lo que no se empieza desde cero. Usar frameworks trae ventajas como ahorrar tiempo y reducir el riesgo de errores.
            </p>
            <p>
              Extraído de: <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" target="_blank" rel="noopener noreferrer">getbootstrap.com</a> y <a href="https://www.codecademy.com/resources/blog/what-is-a-framework/" target="_blank" rel="noopener noreferrer">codecademy.com</a>
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <img src={logo} alt="Logo" style={{ width: "290px" }} />
      </div>

      <div className="d-flex justify-content-center mt-4 mb-4">
        <Link className="btn btn-primary" style={{ backgroundColor: "#f497b6", color: "white" }} to="/">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default AcercaDe;
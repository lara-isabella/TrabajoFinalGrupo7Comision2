export function inicializarUsuarios() {
  const usuariosExistentes = JSON.parse(localStorage.getItem("users"));
  if (!usuariosExistentes || usuariosExistentes.length === 0) {
    const usuariosIniciales = [
      { nombre: "Administrador", email: "admin@example.com", password: "admin123", rol: "admin" },
      { nombre: "Usuario", email: "user@example.com", password: "user123", rol: "user" }
    ];
    localStorage.setItem("users", JSON.stringify(usuariosIniciales));
    console.log("Usuarios iniciales cargados en localStorage");
  } else {
    console.log("Ya existen usuarios en localStorage");
  }
}

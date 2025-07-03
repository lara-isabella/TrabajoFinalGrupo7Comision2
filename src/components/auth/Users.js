export function inicializarUsuarios() {
  const usuariosGuardadosRaw = localStorage.getItem("users");
  console.log("Raw localStorage users:", usuariosGuardadosRaw);

  let usuariosExistentes;
  try {
    usuariosExistentes = usuariosGuardadosRaw ? JSON.parse(usuariosGuardadosRaw) : null;
  } catch (error) {
    console.error("Error parseando usuarios en localStorage:", error);
    usuariosExistentes = null;
  }

  console.log("Usuarios existentes parseados:", usuariosExistentes);

  if (!usuariosExistentes || usuariosExistentes.length === 0) {
    const usuariosIniciales = [
      { nombre: "Administrador", email: "admin@example.com", pass: "admin123", rol: "admin" },
      { nombre: "Usuario", email: "user@example.com", pass: "user123", rol: "user" }
    ];
    localStorage.setItem("users", JSON.stringify(usuariosIniciales));
    console.log("Usuarios iniciales cargados en localStorage");
  } else {
    console.log("Ya existen usuarios en localStorage");
  }
}

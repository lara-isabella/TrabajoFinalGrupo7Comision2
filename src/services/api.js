// src/services/api.js

export const obtenerProductos = async () => {
  const respuesta = await fetch('https://fakestoreapi.com/products');
  if (!respuesta.ok) throw new Error('Error al obtener productos');
  return await respuesta.json();
};

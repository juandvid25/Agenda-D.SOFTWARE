// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";


// GET → Listar contactos (READ)

export async function listarContactos() {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) {
    throw new Error("Error al listar contactos");
  }

  return res.json(); // retorna un array de contactos
}

// POST → Crear un nuevo contacto (CREATE)

export async function crearContacto(data) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear el contacto");
  }

  return res.json(); // retorna el contacto creado con su id
}

// PUT → Actualizar contacto existente (UPDATE)

export async function actualizarContacto(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el contacto");
  }

  return res.json(); // retorna el contacto actualizado
}

// DELETE → Eliminar contacto por ID (DELETE)

export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el contacto");
  }

  return true; // indica éxito
}

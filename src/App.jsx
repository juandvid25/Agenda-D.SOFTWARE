// import { useEffect, useState } from "react";
// import { 
//   listarContactos, 
//   crearContacto, 
//   eliminarContactoPorId 
// } from "./api.jsx";


// import FormularioContacto from "./components/FormularioContacto";
// import ContactoCard from "./components/ContactoCard";

// export default function App() {
//   // Estado principal de la app
//   const [contactos, setContactos] = useState([]);
//   const [cargando, setCargando] = useState(true);
//   const [error, setError] = useState("");

//   // Cargar la lista desde la API al montar el componente (GET)
//   useEffect(() => {
//     async function cargarContactos() {
//       try {
//         const data = await listarContactos(); // GET a la API
//         setContactos(data);                  // Guardamos en estado
//       } catch (error) {
//         console.error(error);
//         setError("No se pudo cargar la lista de contactos");
//       } finally {
//         setCargando(false);
//       }
//     }

//     cargarContactos();
//   }, []);

//   // Agregar contacto usando la API (POST)
//   const agregarContacto = async (nuevo) => {
//     try {
//       const creado = await crearContacto(nuevo); // POST a la API
//       setContactos((prev) => [...prev, creado]); // Actualizamos estado
//     } catch (error) {
//       console.error(error);
//       setError("No se pudo agregar el contacto");
//     }
//   };

//   // Eliminar contacto usando la API (DELETE)
//   const eliminarContacto = async (id) => {
//     try {
//       await eliminarContactoPorId(id);                            // DELETE en la API
//       setContactos((prev) => prev.filter((c) => c.id !== id));    // Quitamos del estado
//     } catch (error) {
//       console.error(error);
//       setError("No se pudo eliminar el contacto");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">

//       {/* Encabezado */}
//       <header className="max-w-6xl mx-auto px-6 pt-8">
//         <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
//           Programa ADSO
//         </p>

//         <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
//           Agenda ADSO v5
//         </h1>

//         <p className="text-gray-500 mt-1">
//         </p>
//       </header>

//       <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">

//         {/* Mensajes de estado */}
//         {error && (
//           <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         {cargando && (
//           <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
//           </div>
//         )}

//         {/* Formulario para agregar contactos */}
//         <FormularioContacto onAgregar={agregarContacto} />

//         {/* Lista de contactos */}
//         <div className="space-y-4">
//           {contactos.length === 0 && !cargando && (
//             <p className="text-gray-500 text-sm">
//             </p>
//           )}

//           {contactos.map((c) => (
//             <ContactoCard 
//               key={c.id} 
//               {...c}
//               onEliminar={() => eliminarContacto(c.id)} 
//             />
//           ))}
//         </div>

//       </section>
//     </main>
//   );
// }

import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState(""); 

  // Cargar contactos al iniciar
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");

        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // Crear contacto
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);

      // 👉 MENSAJE DE ÉXITO
      setMensajeExito("✓ Contacto guardado correctamente");

      // Ocultar después de 3 segundos
      setTimeout(() => setMensajeExito(""), 3000);

    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  // Eliminar contacto
  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto. Inténtalo nuevamente.");
    }
  };

  // Render
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
           {APP_INFO.titulo}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
          {APP_INFO.subtitulo}
          </p>
        </header>

        {/* 🔥 MENSAJE DE ÉXITO */}
        {mensajeExito && (
          <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
            <p className="text-sm font-medium text-green-700">{mensajeExito}</p>
          </div>
        )}

        {/* 🔥 MENSAJE DE ERROR */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            <FormularioContacto onAgregar={onAgregarContacto} />

            <section className="space-y-4 mt-6">
              {contactos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Aún no tienes contactos registrados. Agrega uno con el formulario.
                </p>
              ) : (
                contactos.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        <footer className="mt-10 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

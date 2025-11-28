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

// Importamos hooks de React
import { useEffect, useState } from "react";

// Importamos las funciones de la API (capa de datos)
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la configuración global de la aplicación
import { APP_INFO } from "./config";

// Importamos componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // Estado que almacena la lista de contactos obtenidos de la API
  const [contactos, setContactos] = useState([]);

  // Estado que indica si estamos cargando información
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error
  const [error, setError] = useState("");

  // Estado para el término de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Estado para ordenar: true = A-Z, false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Estado para saber qué contacto se está editando
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // Obtener contactos al cargar la app
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
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  // Actualizar contacto
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");

      const actualizado = await actualizarContacto(
        contactoActualizado.id,
        contactoActualizado
      );

      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );

      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError(
        "No se pudo actualizar el contacto. Verifica tu conexión o el servidor e intenta nuevamente."
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

      setContactoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  // Activar modo edición
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  // Cancelar edición
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  // === BÚSQUEDA ===
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.correo.toLowerCase().includes(termino) ||
      (c.etiqueta || "").toLowerCase().includes(termino)
    );
  });

  // === ORDENAMIENTO ===
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

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
          <p className="text-sm text-gray-600 mt-1">{APP_INFO.subtitulo}</p>
        </header>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            <FormularioContacto
              onAgregar={onAgregarContacto}
              onActualizar={onActualizarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onCancelarEdicion={onCancelarEdicion}
            />

            {/* Buscador */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar por nombre, correo o etiqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            {/* Lista */}
            <section className="space-y-4">
              {contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron contactos que coincidan con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                    onEditar={() => onEditarClick(c)}
                  />
                ))
              )}
            </section>
          </>
        )}

        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

// import { useState } from "react";

// export default function FormularioContacto({ onAgregar }) {
//   // Estado del formulario
//   const [form, setForm] = useState({
//     nombre: "",
//     telefono: "",
//     correo: "",
//     etiqueta: "",
//   });

//   // onChange genérico
//   const onChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // onSubmit
//   const onSubmit = (e) => {
//     e.preventDefault();

//     // Validación mínima
//     if (!form.nombre || !form.telefono || !form.correo) return;

//     // Enviar al padre
//     onAgregar(form);

//     // Limpiar
//     setForm({
//       nombre: "",
//       telefono: "",
//       correo: "",
//       etiqueta: "",
//     });
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-6">
//       <h2 className="text-2xl font-semibold">Agrega un contacto</h2>
      
//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {/* Nombre */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Nombre *
//           </label>
//           <input
//             className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
//             name="nombre"
//             placeholder="Ej: Camila Pérez"
//             value={form.nombre}
//             onChange={onChange}
//           />
//         </div>

//         {/* Teléfono */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Teléfono *
//           </label>
//           <input
//             className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
//             name="telefono"
//             placeholder="Ej: 300 123 4567"
//             value={form.telefono}
//             onChange={onChange}
//           />
//         </div>
//       </div>

//       {/* Correo */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Correo *
//         </label>
//         <input
//           className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
//           name="correo"
//           placeholder="Ej: camila@sena.edu.co"
//           value={form.correo}
//           onChange={onChange}
//         />
//       </div>

//       {/* Etiqueta */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Etiqueta (opcional)
//         </label>
//         <input
//           className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
//           name="etiqueta"
//           placeholder="Ej: Trabajo"
//           value={form.etiqueta}
//           onChange={onChange}
//         />
//       </div>

//       {/* Botón */}
//       <button
//         className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
//       >
//         Agregar contacto
//       </button>

//     </form>
//   );
// }

import { useState } from "react";

function FormularioContacto({ onAgregar }) {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado de errores
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);

  // Manejar cambios de los inputs
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Función que valida el formulario
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }
    else if (form.telefono.trim().length < 10) {nuevosErrores.telefono = "El teléfono debe tener al menos 10 dígitos."; }



    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    // Guardamos errores
    setErrores(nuevosErrores);

    // True si no hay errores
    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // Envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true);

      await onAgregar(form);

      // Reset
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      className="bg-white shadow-sm rounded-2xl p-6 space-y-4 mb-8"
      onSubmit={onSubmit}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Nuevo contacto
      </h2>

      {/* Campo Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />
        {errores.nombre && (
          <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>
        )}
      </div>

      {/* Campo Teléfono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />
        {errores.telefono && (
          <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>
        )}
      </div>

      {/* Campo Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <p className="mt-1 text-xs text-red-600">{errores.correo}</p>
        )}
      </div>

      {/* Campo Etiqueta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botón */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando ? "Guardando..." : "Agregar contacto"}
        </button>
      </div>
    </form>
  );
}

export default FormularioContacto;

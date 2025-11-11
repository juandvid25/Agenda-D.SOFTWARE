// export default function ContactoCard({
//   id,
//   nombre,
//   telefono,
//   correo,
//   etiqueta,
//   onEliminar,
// }) {
//   return (
//     <div className="card">
//       <h3>{nombre}</h3>
//       <p>📞 {telefono}</p>
//       <p>✉️ {correo}</p>
//       {etiqueta && <span className="tag">{etiqueta}</span>}
//       <button className="btn-eliminar" onClick={() => onEliminar(id)}>
//         Eliminar
//       </button>
//     </div>
//   );
// }
// Instructor: Gustavo Bolaños – Curso: Desarrollo Web – ReactJS (Agenda ADSO)

// Instructor: Gustavo Bolaños – Curso: Desarrollo Web – ReactJS (Agenda ADSO)

export default function ContactCard({ nombre, telefono, correo, etiqueta, onEliminar }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex justify-between items-start">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{nombre}</h3>

        <p className="flex items-center gap-1 text-sm text-gray-700">
          <span className="text-morado">📞</span>
          {telefono}
        </p>

        <p className="flex items-center gap-1 text-sm text-gray-700">
          <span className="text-morado">📧</span>
          {correo}
        </p>

        {etiqueta && (
          <span className="bg-morado/10 text-morado text-xs font-medium rounded-full px-3 py-1 inline-block">
            {etiqueta}
          </span>
        )}
      </div>

      <button
        onClick={onEliminar}
        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1.5 rounded-md"
      >
        Eliminar
      </button>
    </article>
  );
}

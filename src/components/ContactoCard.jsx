export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onEliminar,
}) {
  return (
    <div className="card">
      <h3>{nombre}</h3>
      <p>📞 {telefono}</p>
      <p>✉️ {correo}</p>
      {etiqueta && <span className="tag">{etiqueta}</span>}
      <button className="btn-eliminar" onClick={() => onEliminar(id)}>
        Eliminar
      </button>
    </div>
  );
}

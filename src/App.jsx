import { useState, useEffect } from "react";
import "./App.css";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];

  const [contactos, setContactos] = useState(contactosGuardados);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este contacto?");
    if (confirmar) {
      setContactos((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v3</h1>
      <FormularioContacto onAgregar={agregarContacto} />
      <div className="contactos-lista">
        {contactos.map((c) => (
          <ContactoCard key={c.id} {...c} onEliminar={eliminarContacto} />
        ))}
      </div>
    </main>
  );
}

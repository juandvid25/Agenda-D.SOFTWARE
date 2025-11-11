import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const contactosGuardados = JSON.parse(localStorage.getItem("contactos")) || [];
  const [contactos, setContactos] = useState(contactosGuardados);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

return (
  <main className="max-w-3xl mx-auto px-4 py-8 space-y-4 text-center">
    <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-purple-600">
      Agenda v4
    </h1>

      <FormularioContacto onAgregar={agregarContacto} />

      <section className="space-y-4">
        {contactos.map((c) => (
          <ContactoCard key={c.correo} {...c} onEliminar={eliminarContacto} />
        ))}
      </section>
    </main>
  );
}

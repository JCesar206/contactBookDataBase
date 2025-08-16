import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ContactForm({ selectedContact, onSave, onCancelEdit }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const nombreRef = useRef(null);

  useEffect(() => {
    if (selectedContact) {
      setNombre(selectedContact.nombre);
      setTelefono(selectedContact.telefono);
      setEmail(selectedContact.email);
    } else {
      setNombre("");
      setTelefono("");
      setEmail("");
    }
    nombreRef.current?.focus();
  }, [selectedContact]);

  const limpiarFormulario = () => {
    setNombre("");
    setTelefono("");
    setEmail("");
    nombreRef.current?.focus();
    if (onCancelEdit) onCancelEdit(); // para salir del modo edición
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactoData = {nombre, telefono, email};
    console.log("Enviando datos al backend", contactoData);

      if (selectedContact) {
        await axios.put(`http://localhost:4000/contactos/${selectedContact.id}`, contactoData);
      } else {
        await axios.post("http://localhost:4000/contactos", contactoData);
      }
      onSave();
      limpiarFormulario();
    };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4 w-full max-w-md mx-auto">
      <input
        ref={nombreRef}
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          {selectedContact ? "Actualizar" : "Agregar"}
        </button>
        <button
          type="button"
          onClick={limpiarFormulario}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}

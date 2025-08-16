import { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [contactos, setContactos] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/contactos");
      setContactos(res.data);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/contactos/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 pb-20">
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-3xl font-bold mb-4">Agenda de Contactos</h1>
        <ContactForm
          selectedContact={selectedContact}
          onSave={fetchData}
          onCancelEdit={() => setSelectedContact(null)}
        />
        <ContactList
          contactos={contactos}
          onEdit={(c) => setSelectedContact(c)}
          onDelete={handleDelete}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;

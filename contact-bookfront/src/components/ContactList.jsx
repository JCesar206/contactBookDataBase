import axios from "axios";

export default function ContactList({ contactos, onEdit, onDelete }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow-md mt-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nombre</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Email</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{c.nombre}</td>
              <td className="p-2">{c.telefono}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onEdit(c)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

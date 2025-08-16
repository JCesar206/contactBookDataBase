const express = require("express");
const cors = require("cors");
const db = require("./db");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Obtener todos los contactos
app.get("/contactos", (req, res) => {
	db.query("SELECT * FROM contactos", (err, results) => {
		if (err) return res.status(500).json({ error: err });
		res.json(results);
	});
});

// Crear contacto
app.post("/contactos", (req, res) => {
	const { nombre, telefono, email } = req.body;
	db.query(
		"INSERT INTO contactos (nombre, telefono, email) VALUES (?,?,?)",
		[nombre, telefono, email],
		(err, result) => {
			if (err) return res.status(500).json({ error: err });
			res.json({ id: result.insertId, nombre, telefono, email });
		}
	);
});

// Actualizar contacto
app.put("/contactos/:id", (req, res) => {
	const { id } = req.params;
	const { nombre, telefono, email } = req.body;
	console.log("Actualizando contacto id:", id, "con contactos:", nombre, telefono, email);

	const sql = "UPDATE contactos SET nombre=?, telefono=?, email=? WHERE id=?";
	db.query(sql, [nombre, telefono, email, id], (err, result) => {
		if (err) {
			console.error("Error en UPDATE:", err);
			return res.status(500).json({ error: err });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ mensaje: "Contacto no encontrado" });
		}
		res.json({ id, nombre, telefono, email });
	});
});

// Eliminar contacto
app.delete("/contactos/:id", (req, res) => {
	const { id } = req.params;
	db.query(
		"DELETE FROM contactos WHERE id=?", [id], (err) => {
			if (err) return res.status(500).json({ error: err });
			res.json({ mensaje: "Contacto Eliminado" });
		}
	);
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
	console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});
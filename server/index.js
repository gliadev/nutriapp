// Importar las dependencias
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Importar rutas
const pacienteRoutes = require("./routes/pacienteRoutes");
const entrenamientoRoutes = require("./routes/entrenamientoRoutes");
const citaRoutes = require("./routes/citaRoutes");
const nutricionistaRoutes = require("./routes/nutricionistaRoutes");
const menusSemanalRoutes = require("./routes/menusSemanalRoutes");

// Cargar las variables de entorno del archivo .env
dotenv.config();

// Conectar Mongoose a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB Atlas tooOK"))
  .catch((err) => console.error("Error al conectar a MongoDB Atlas:", err));

// Crear la aplicación Express
const app = express();

// Configurar middlewares
app.use(express.json());

// Configurar middlewares, rutas, etc.
app.use("/api/paciente", pacienteRoutes);
app.use("/api/entrenamiento", entrenamientoRoutes);
app.use("/api/nutricionista", nutricionistaRoutes);
app.use("/api/cita", citaRoutes);
app.use("/api/menus-semanal", menusSemanalRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

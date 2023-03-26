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
  .then(() => console.log("Conexión a MongoDB Atlas exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB Atlas:", err));

// Obtener una referencia a la conexión de base de datos
const db = mongoose.connection;

// Manejar eventos de la conexión de base de datos
db.on("error", console.error.bind(console, "Error en la conexión a MongoDB:"));
db.once("open", function() {
  console.log("Conexión a la base de datos establecida");

  // Crear la aplicación Express
  const app = express();

  // Configurar middlewares
  app.use(express.json());

  // Agregar las rutas de las colecciones
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
});

// Importar las dependencias
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Importar rutas
const pacienteRoutes = require("./routes/pacienteRoutes");
const entrenamientoRoutes = require("./routes/entrenamientoRoutes");

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
app.use("/paciente", pacienteRoutes);
app.use("/entrenamiento", entrenamientoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

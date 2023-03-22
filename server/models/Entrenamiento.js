const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrenamientoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  duracion: {
    type: Number,
    required: true,
  },
  nivel: {
    type: String,
    enum: ["Principiante", "Intermedio", "Avanzado"],
    required: true,
  },
  nutricionista: {
    type: Schema.Types.ObjectId,
    ref: "Nutricionista",
    required: true,
  },
  // Añade aquí más campos según tus necesidades
});

const Entrenamiento = mongoose.model("Entrenamiento", EntrenamientoSchema);

module.exports = Entrenamiento;

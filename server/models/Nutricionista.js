const mongoose = require("mongoose");

const NutricionistaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  especialidad: {
    type: String,
    required: true,
  },
  aniosExperiencia: {
    type: Number,
    required: true,
  },
  ol: {
    type: String,
    default: "nutricionista",
  },
  // Añadir mas si necesitas
});

const Nutricionista = mongoose.model("Nutricionista", NutricionistaSchema);

module.exports = Nutricionista;

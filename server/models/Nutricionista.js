const mongoose = require("mongoose");

const NutricionistaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
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
  rol: {
    type: String,
    default: "nutricionista",
  },
  // Añadir mas si necesitas
});

const Nutricionista = mongoose.model("Nutricionista", NutricionistaSchema);

module.exports = Nutricionista;

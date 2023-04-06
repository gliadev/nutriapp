const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema({
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
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  pesoActual: {
    type: String,
    require: true,
  },
  historialMedico: {
    type: String,
    require: true,
  },
  rol: {
    type: String,
    default: "pacinete",
  },
  // Añade aquí más campos según tus necesidades
});

const Paciente = mongoose.model("Paciente", PacienteSchema);

module.exports = Paciente;

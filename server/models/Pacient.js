const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema({
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
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  // Añade aquí más campos según tus necesidades
});

const Paciente = mongoose.model("Paciente", PacienteSchema);

module.exports = Paciente;

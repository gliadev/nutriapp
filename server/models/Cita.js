const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  paciente: {
    type: Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
  nutricionista: {
    type: Schema.Types.ObjectId,
    ref: "Nutricionista",
    required: true,
  },
  motivo: {
    type: String,
    required: true,
  },
  observaciones: String,
});

const Cita = mongoose.model("Cita", CitaSchema);

module.exports = Cita;

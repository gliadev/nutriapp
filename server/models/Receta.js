const mongoose = require("mongoose");

const RecetaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ingredientes: {
    type: [String],
    required: true,
  },
  pasos: {
    type: [String],
    required: true,
  },
  imagen: {
    type: String,
  },
  nutricionista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nutricionista",
    required: true,
  },
});

const Receta = mongoose.model("Receta", RecetaSchema);

module.exports = Receta;

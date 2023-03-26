const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSemanalSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  dias: [
    {
      dia: {
        type: String,
        required: true,
      },
      desayuno: String,
      almuerzo: String,
      cena: String,
      //
    },
  ],
  nutricionista: {
    type: Schema.Types.ObjectId,
    ref: "Nutricionista",
    required: true,
  },
  // más campos según necesidades
});

const MenuSemanal = mongoose.model("MenuSemanal", MenuSemanalSchema);

module.exports = MenuSemanal;

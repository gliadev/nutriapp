const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "paciente",
    enum: ["admin", "nutricionista", "paciente"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  apellidos: {
    type: String,
  },
  fechaNacimiento: {
    type: Date,
  },
  pesoActual: {
    type: String,
  },
  historialMedico: {
    type: String,
  },
  especialidad: {
    type: String,
  },
  aniosExperiencia: {
    type: Number,
  },
  // mas campos
});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

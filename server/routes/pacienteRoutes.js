const express = require("express");
const router = express.Router();
const Paciente = require("../models/Pacient");

// Ruta para obtener todos los pacientes
router.get("/", async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener un paciente por ID
router.get(":id", async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (paciente == null) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un paciente
router.post("/", async (req, res) => {
  const paciente = new Paciente({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    fechaNacimiento: req.body.fechaNacimiento,
    pesoActual: req.body.pesoActual,
    historialMedico: req.body.historialMedico,
    // aqui ya añado mas si necesitamos
  });

  try {
    const newPaciente = await paciente.save();
    res.status(201).json(newPaciente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para actualizar un paciente por ID
router.put("/:id", async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (paciente == null) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json(paciente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar un paciente por ID
router.delete("/:id", async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (paciente == null) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    await paciente.remove();
    res.json({ message: "Paciente eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

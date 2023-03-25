const express = require("express");
const router = express.Router();
const Cita = require("../models/Cita");

// ruta get para obtener citas
router.get("/", async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta put para actualizar una cita
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCita = await Cita.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json(updatedCita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ruta para crear una cita nueva
router.post("/", async (req, res) => {
  const { fecha, hora, paciente, nutricionista, motivo, observaciones } =
    req.body;

  const cita = new Cita({
    fecha,
    hora,
    paciente,
    nutricionista,
    motivo,
    observaciones,
  });
  try {
    const newCita = await cita.save();
    res.status(201).json(newCita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta delete para eliminar una cita
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCita = await Cita.findByIdAndDelete(id);
    if (!deletedCita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json({ message: "Cita eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

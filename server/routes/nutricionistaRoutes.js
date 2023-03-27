const express = require("express");
const router = express.Router();
const Nutricionista = require("../models/Nutricionista");

// router get para obtener los nutris
router.get("", async (req, res) => {
  try {
    const nutricionista = await Nutricionista.find();
    res.json(nutricionista);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Ruta put para actualizar  nutri
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNutricionista = await Nutricionista.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedNutricionista) {
      return res.status(400).json({
        message: "Nutricionista no encontrado",
      });
    }
    res.json(updatedNutricionista);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ruta post para crear un nitri
router.post("", async (req, res) => {
  const { nombre, apellido, email, especialidad, aniosExperiencia } = req.body;
  const nutricionista = new Nutricionista({
    nombre,
    apellido,
    email,
    especialidad,
    aniosExperiencia,
  });
  try {
    const newNutricionista = await nutricionista.save();
    res.status(201).json(newNutricionista);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ruta delete para borrar nutri
router.delete("", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCita = await Nutricionista.findByIdAndDelete(id);
    if (!deletedCita) {
      return res.status(404).json({ message: "Nutricionista no encontrado" });
    }
    res.json({ message: "Nutricionista eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

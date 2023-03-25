const express = require("express");
const router = express.Router();
const Entrenamiento = require("../models/Entrenamiento");

// ruta get para obtener los entrenamientos
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEntrenamiento = await Entrenamiento.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEntrenamiento) {
      return res.status(404).json({ message: "Entrenamiento no encontrado" });
    }

    res.json(updatedEntrenamiento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta POST para crear un nuevo entrenamiento
router.post("/", async (req, res) => {
  const entrenamiento = new Entrenamiento(req.body);

  try {
    const newEntrenamiento = await entrenamiento.save();
    res.status(201).json(newEntrenamiento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta PUT para actualizar un entrenamiento existente
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEntrenamiento = await Entrenamiento.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEntrenamiento) {
      return res.status(404).json({ message: "Entrenamiento no encontrado" });
    }
    res.json(updatedEntrenamiento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta DELETE para eliminar un entrenamiento existente
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEntrenamiento = await Entrenamiento.findByIdAndDelete(id);
    if (!deletedEntrenamiento) {
      return res.status(404).json({ message: "Entrenamiento no encontrado" });
    }
    res.json({ message: "Entrenamiento eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

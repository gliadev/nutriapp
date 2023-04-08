const express = require("express");
const router = express.Router();
const Receta = require("../models/Receta");
const Nutricionista = require("../models/Nutricionista");
const authorizeRole = require("../middleware/authorizeRole");
const verifyToken = require("../middleware/verifyToken");
const { authenticate } = require("../middleware/authMiddleware");
const { roles } = require("../helpers/roles");

// Obtener todas las recetas
router.get("", verifyToken, authenticate, async (req, res) => {
  try {
    const recetas = await Receta.find().populate("nutricionista");
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una receta específica
router.get("/:id", verifyToken, authenticate, async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id).populate(
      "nutricionista"
    );
    res.json(receta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una receta
router.post("", verifyToken, authenticate, async (req, res) => {
  try {
    const { titulo, ingredientes, pasos, nutricionista } = req.body;
    const nutricionistaExistente = await Nutricionista.findById(nutricionista);

    if (!nutricionistaExistente) {
      return res.status(400).json({ message: "Nutricionista no encontrado" });
    }

    const newReceta = new Receta({
      titulo,
      ingredientes,
      pasos,
      nutricionista,
    });

    const savedReceta = await newReceta.save();
    res.status(201).json(savedReceta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una receta
router.put("/:id", verifyToken, authenticate, async (req, res) => {
  try {
    const updatedReceta = await Receta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReceta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una receta
router.delete(
  "/:id",
  verifyToken,
  authenticate,
  authorizeRole(roles.ADMIN, roles.NUTRICIONISTA),
  async (req, res) => {
    try {
      const deletedReceta = await Receta.findByIdAndRemove(req.params.id);
      res.json({
        message: "Receta eliminada con éxito",
        deletedReceta,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;

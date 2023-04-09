const express = require("express");
const router = express.Router();
const Entrenamiento = require("../models/Entrenamiento");
const {
  adminMiddleware,
  authMiddleware,
  authorizeRole,
  verifyToken,
} = require("../middleware/middlewares");
const { roles } = require("../helpers/roles");

// Ruta GET para obtener todos los entrenamientos
router.get(
  "/",
  verifyToken,
  authMiddleware,
  authorizeRole([roles.admin, roles.nutricionista, roles.paciente]),
  async (req, res) => {
    try {
      const entrenamientos = await Entrenamiento.find();
      res.json(entrenamientos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Ruta GET para obtener un entrenamiento por su ID
router.get(
  "/:id",
  verifyToken,
  authMiddleware,
  authorizeRole([roles.admin, roles.nutricionista, roles.paciente]),
  async (req, res) => {
    const { id } = req.params;

    try {
      const entrenamiento = await Entrenamiento.findById(id).populate(
        "nutricionista",
        "nombre"
      );

      if (!entrenamiento) {
        return res.status(404).json({ message: "Entrenamiento no encontrado" });
      }

      res.json(entrenamiento);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Ruta PUT para actualizar un entrenamiento existente
router.put(
  "/:id",
  verifyToken,
  authMiddleware,
  authorizeRole([roles.admin, roles.nutricionista]),
  async (req, res) => {
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
  }
);

// Ruta POST para crear un nuevo entrenamiento
router.post(
  "/",
  verifyToken,
  authMiddleware,
  authorizeRole([roles.admin, roles.nutricionista]),
  async (req, res) => {
    const entrenamiento = new Entrenamiento(req.body);

    try {
      const newEntrenamiento = await entrenamiento.save();
      res.status(201).json(newEntrenamiento);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Ruta DELETE para eliminar un entrenamiento existente
router.delete(
  "/:id",
  verifyToken,
  authMiddleware,
  authorizeRole([roles.admin, roles.nutricionista]),
  async (req, res) => {
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
  }
);

module.exports = router;

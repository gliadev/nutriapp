const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const verifyToken = require("../middleware/verifyToken");

// Ruta para obtener todos los pacientes
router.get(
  "/",
  verifyToken,
  authenticate,
  authorizeRole("admin", "nutricionista"),
  async (req, res) => {
    try {
      const pacientes = await User.find({ role: "paciente" });
      res.json(pacientes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Ruta para obtener un paciente por ID
router.get(
  "/:id",
  verifyToken,
  authenticate,
  authorizeRole("admin", "nutricionista"),
  async (req, res) => {
    try {
      const paciente = await User.findById(req.params.id);
      if (paciente == null || paciente.role !== "paciente") {
        return res.status(404).json({ message: "Paciente no encontrado" });
      }
      res.json(paciente);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Ruta para actualizar un paciente por ID
router.put(
  "/:id",
  verifyToken,
  authenticate,
  authorizeRole("admin", "nutricionista"),
  async (req, res) => {
    try {
      const paciente = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (paciente == null || paciente.role !== "paciente") {
        return res.status(404).json({ message: "Paciente no encontrado" });
      }
      res.json(paciente);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Ruta para eliminar un paciente por ID
router.delete(
  "/:id",
  verifyToken,
  authenticate,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const paciente = await User.findById(req.params.id);
      if (paciente == null || paciente.role !== "paciente") {
        return res.status(404).json({ message: "Paciente no encontrado" });
      }
      await paciente.remove();
      res.json({ message: "Paciente eliminado con éxito" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const verifyToken = require("../middleware/verifyToken");
const { roles } = require("../helpers/roles");

// router get para obtener los nutris
router.get(
  "",
  verifyToken,
  authenticate,
  authorizeRole(roles.ADMIN, roles.NUTRICIONISTA),
  async (req, res) => {
    try {
      const nutricionistas = await User.find({ role: "nutricionista" });
      res.json(nutricionistas);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

// Ruta put para actualizar  nutri
router.put(
  "/:id",
  verifyToken,
  authenticate,
  authorizeRole(roles.ADMIN, roles.NUTRICIONISTA),
  async (req, res) => {
    const { id } = req.params;
    try {
      const updatedNutricionista = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedNutricionista) {
        return res.status(400).json({
          message: "Nutricionista no encontrado",
        });
      }
      res.json(updatedNutricionista);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// ruta post para crear un nitri
router.post(
  "",
  verifyToken,
  authenticate,
  authorizeRole(roles.ADMIN),
  async (req, res) => {
    const { nombre, apellido, email, especialidad, aniosExperiencia } =
      req.body;
    const nutricionista = new User({
      nombre,
      apellido,
      email,
      especialidad,
      aniosExperiencia,
      role: "nutricionista",
    });
    try {
      const newNutricionista = await nutricionista.save();
      res.status(201).json(newNutricionista);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// ruta delete para borrar nutri
router.delete(
  "/:id",
  verifyToken,
  authenticate,
  authorizeRole(roles.ADMIN),
  async (req, res) => {
    const { id } = req.params;
    try {
      const deletedNutricionista = await User.findByIdAndDelete(id);
      if (!deletedNutricionista) {
        return res.status(404).json({ message: "Nutricionista no encontrado" });
      }
      res.json({ message: "Nutricionista eliminado" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;

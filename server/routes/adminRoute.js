const express = require("express");
const router = express.Router();
const Admin = requiere("../models/Admin.js");
const Nutricionista = require("../models/Nutricionista");
const Paciente = require("../models/Pacient");
const Entrenamiento = requiere("../models/Entrenamiento.js");
const {
  adminMiddleware,
  authMiddleware,
  authorizeRole,
  verifyToken,
} = require("../middleware/middlewares");

// Ruta para obtener todos los nutricionistas
router.get(
  "/",
  verifyToken,
  authMiddleware,
  checkRole(roles.Admin),
  async (req, res) => {
    try {
      const nutricionistas = await Nutricionista.find();
      res.json(nutricionistas);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

// Ruta para obtener un nutricionista por ID
router.get(
  "/:id",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
    try {
      const nutricionista = await Nutricionista.findById(req.params.id);
      if (nutricionista == null) {
        return res.status(404).json({ message: "Nutricionista no encontrado" });
      }
      res.json(nutricionista);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Ruta para crear un nutricionista
router.post(
  "/",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
    const nutricionista = new Nutricionista({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      especialidad: req.body.especialidad,
      aniosExperiencia: req.body.aniosExperiencia,
    });

    try {
      const newNutricionista = await nutricionista.save();
      res.status(201).json(newNutricionista);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Ruta para actualizar un nutricionista por ID
router.put(
  "/:id",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
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
  }
);

// Ruta para eliminar un nutricionista por ID
router.delete(
  "/:id",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const deletedNutricionista = await Nutricionista.findByIdAndDelete(id);
      if (!deletedNutricionista) {
        return res.status(404).json({ message: "Nutricionista no encontrado" });
      }
      res.json({ message: "Nutricionista eliminado" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Ruta para obtener todos los pacientes
router.get(
  "/",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
    try {
      const pacientes = await Paciente.find();
      res.json(pacientes);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

// Ruta para obtener un paciente por ID
router.get(
  "/:id",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
    try {
      const paciente = await Paciente.findById(req.params.id);
      if (paciente == null) {
        return res.status(404).json({ message: "Paciente no encontrado" });
      }
      res.json(paciente);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Ruta para crear un paciente
router.post(
  "/",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
    const paciente = new Paciente({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      fechaNacimiento: req.body.fechaNacimiento,
      pesoActual: req.body.pesoActual,
      historialMedico: req.body.historialMedico,
    });

    try {
      const newPaciente = await paciente.save();
      res.status(201).json(newPaciente);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Ruta para obtener todos los entrenamientos
router.get("/", verifyToken, authMiddleware, async (req, res) => {
  try {
    const entrenamientos = await Entrenamiento.find().populate(
      "nutricionista",
      "nombre apellido email"
    );
    res.json(entrenamientos);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Ruta para obtener un entrenamiento por ID
router.get("/:id", verifyToken, authMiddleware, async (req, res) => {
  try {
    const entrenamiento = await Entrenamiento.findById(req.params.id).populate(
      "nutricionista",
      "nombre apellido email"
    );
    if (entrenamiento == null) {
      return res.status(404).json({ message: "Entrenamiento no encontrado" });
    }
    res.json(entrenamiento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un entrenamiento
router.post(
  "/",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
  async (req, res) => {
    const entrenamiento = new Entrenamiento({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      duracion: req.body.duracion,
      nivel: req.body.nivel,
      nutricionista: req.body.nutricionista,
    });

    try {
      const newEntrenamiento = await entrenamiento.save();
      res.status(201).json(newEntrenamiento);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Ruta para actualizar un entrenamiento por ID
router.put(
  "/:id",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
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
        return res.status(400).json({
          message: "Entrenamiento no encontrado",
        });
      }
      res.json(updatedEntrenamiento);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Ruta para eliminar un entrenamiento por ID
router.delete(
  "/:id",
  verifyToken,
  authMiddleware,
  checkRole("admin"),
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

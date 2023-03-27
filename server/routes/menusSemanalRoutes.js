const express = require("express");
const router = express.Router();
const MenuSemanal = require("../models/MenusSemanal");
const Nutricionista = require("../models/Nutricionista");

// Obtener todos los menús semanales
router.get("", async (req, res) => {
  try {
    const menus = await MenuSemanal.find().populate("nutricionista");
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un menú semanal específico
router.get("/:id", async (req, res) => {
  try {
    const menu = await MenuSemanal.findById(req.params.id).populate(
      "nutricionista"
    );
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un menú semanal
router.post("", async (req, res) => {
  try {
    const { nombre, descripcion, dias, nutricionista } = req.body;
    const nutricionistaExistente = await Nutricionista.findById(nutricionista);

    if (!nutricionistaExistente) {
      return res.status(400).json({ message: "Nutricionista no encontrado" });
    }

    const newMenuSemanal = new MenuSemanal({
      nombre,
      descripcion,
      dias,
      nutricionista,
    });

    const savedMenuSemanal = await newMenuSemanal.save();
    res.status(201).json(savedMenuSemanal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un menú semanal
router.put("/:id", async (req, res) => {
  try {
    const updatedMenuSemanal = await MenuSemanal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMenuSemanal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un menú semanal
router.delete("/:id", async (req, res) => {
  try {
    const deletedMenuSemanal = await MenuSemanal.findByIdAndRemove(
      req.params.id
    );
    res.json({
      message: "Menú semanal eliminado con éxito",
      deletedMenuSemanal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

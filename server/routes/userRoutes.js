const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { authorizeRole } = require("../middleware/authMiddleware");

// Ruta para el registro de usuarios
router.post("/register", registerUser);

// Ruta para el login de usuarios
router.post("/login", loginUser);

module.exports = router;

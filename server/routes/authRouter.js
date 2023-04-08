const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { checkUserIsAdmin } = require("../middlewares/authMiddleware");

// Endpoint para registrar un usuario
router.post("/register", checkUserIsAdmin, registerUser);

// Endpoint para iniciar sesión
router.post("/login", loginUser);

module.exports = router;

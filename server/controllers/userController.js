const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Controlador para registrar un usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica si el email ya está registrado
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Este email ya está registrado" });
    }

    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea un nuevo usuario con rol "paciente"
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "paciente",
    });

    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// Controlador para iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca el usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email o contraseña inválidos" });
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email o contraseña inválidos" });
    }

    // Genera un token de acceso
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

module.exports = { registerUser, loginUser };

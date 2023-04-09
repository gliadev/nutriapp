const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const User = require("../models/User");

// Middleware de autorización
function authMiddleware(req, res, next) {
  console.log("middleware de autorización ejecutado"); // para borrar buscando fallo
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }
}

// Función para autorizar roles
function authorizeRole(roles) {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);

      // Comprueba si el usuario tiene el rol adecuado
      if (!roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para acceder a este recurso" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Error de autenticación" });
    }
  };
}

// Función para comprobar rol
function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "No autorizado" });
    }
  };
}

// Función para permitir solo a los administradores
function adminMiddleware(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "No autorizado" });
  }
}

// Función para verificar el token de acceso
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de acceso" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token de acceso no válido" });
  }
}

module.exports = {
  authMiddleware,
  authorizeRole,
  checkRole,
  adminMiddleware,
  verifyToken,
};

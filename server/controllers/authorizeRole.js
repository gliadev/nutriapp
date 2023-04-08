const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authorizeRole = (role) => {
  return async (req, res, next) => {
    try {
      // Extrae el token de la cabecera 'Authorization'
      const token = req.headers.authorization.split(" ")[1];

      // Verifica y decodifica el token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Busca al usuario en la base de datos
      const user = await User.findById(decodedToken.userId);

      // Comprueba si el usuario tiene el rol adecuado
      if (user.role !== role) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para acceder a este recurso" });
      }

      // Adjunta el objeto 'user' a la solicitud para que pueda ser utilizado por otros middlewares y controladores
      req.user = user;

      // Continúa con el siguiente middleware o controlador
      next();
    } catch (error) {
      res.status(401).json({ message: "Error de autenticación" });
    }
  };
};

module.exports = { authorizeRole };

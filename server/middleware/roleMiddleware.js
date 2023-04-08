const checkRole = (role) => (req, res, next) => {
  if (req.user && req.user.rol === role) {
    next();
  } else {
    res.status(403).json({ message: "No autorizado" });
  }
};

module.exports = checkRole;

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "No autorizado" });
  }
};

module.exports = adminMiddleware;

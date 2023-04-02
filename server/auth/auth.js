const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("hex");

// Función para crear tokens JWT
function createToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "1d" });
}

// Función para verificar tokens JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return null;
  }
}

// Función para cifrar contraseñas de usuario
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// Función para comparar contraseñas cifradas y sin cifrar
function comparePasswords(password, hash) {
  return bcrypt.compareSync(password, hash);
}
module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  comparePasswords,
};

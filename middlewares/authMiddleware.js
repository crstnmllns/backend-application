const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ msg: "Acceso denegado. Token requerido" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next(); 
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;

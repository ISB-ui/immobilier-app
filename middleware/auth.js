const jwt = require("jsonwebtoken");

/**
 * 🔐 Protection JWT
 */
const ErrorResponse = require('../utils/errorResponse');

exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse('Accès refusé : authentification requise', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new ErrorResponse('Token invalide ou expiré', 401));
  }
};

/**
 * 🔐 Autorisation par rôle
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorResponse('Accès interdit : droits insuffisants', 403));
    }
    next();
  };
};

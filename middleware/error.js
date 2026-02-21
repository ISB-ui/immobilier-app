const ErrorResponse = require('../utils/errorResponse');

// middleware express pour gérer les erreurs centralisées
function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  // mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Ressource introuvable avec l'id : ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(messages.join(', '), 400);
  }

  // duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Entrée dupliquée pour le champ ${field} : ${err.keyValue[field]}`;
    error = new ErrorResponse(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Jeton invalide, veuillez vous reconnecter', 401);
  }
  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse('Jeton expiré, veuillez vous reconnecter', 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erreur serveur'
  });
}

module.exports = errorHandler;
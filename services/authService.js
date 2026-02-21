const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

// génère un token jwt
function generateToken(id, role = 'user') {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
}

async function login(email, password) {
  if (!email || !password) {
    throw new ErrorResponse('Veuillez fournir un email et un mot de passe', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ErrorResponse('Email ou mot de passe incorrect', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorResponse('Email ou mot de passe incorrect', 401);
  }

  const token = generateToken(user._id, user.role);
  return { token, user: user.toJSON() };
}

async function register({ nom, prenom, email, password, telephone, role = 'user' }) {
  if (!nom || !prenom || !email || !password) {
    throw new ErrorResponse('Veuillez fournir tous les champs obligatoires', 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ErrorResponse("Un utilisateur avec cet email existe déjà", 400);
  }

  const user = await User.create({ nom, prenom, email, password, telephone, role });
  const token = generateToken(user._id, user.role);
  return { token, user: user.toJSON() };
}

async function getMe(userId) {
  const user = await User.findById(userId);
  return user;
}

module.exports = { login, register, getMe, generateToken };

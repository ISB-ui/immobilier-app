const express = require('express');
const { login, register, getMe, logout, createAdmin } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.post('/login', login);
router.post('/register', register);

// création d'admin réservée au superadmin
router.post('/create-admin', protect, authorize('superadmin'), createAdmin);

// Routes protégées
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);

module.exports = router;

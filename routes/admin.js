const express = require('express');
const {
  getAllAnnonces,
  validerAnnonce,
  refuserAnnonce,
  deleteAnnonce,
  getStats,
  getAllUsers,
  getUserById,
  verifyAdminPassword
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Route publique (login admin / vérification mot de passe)
router.post('/verify-password', verifyAdminPassword);

// 🔒 PROTECTION TOTALE DES ROUTES ADMIN
router.use(protect);
// autorise aussi les superadmins
router.use(authorize("admin","superadmin"));

// Routes admin sécurisées
router.get('/annonces', getAllAnnonces);
router.put('/annonces/:id/valider', validerAnnonce);
router.put('/annonces/:id/refuser', refuserAnnonce);
router.delete('/annonces/:id', deleteAnnonce);
router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', require('../controllers/adminController').deleteUser);

// superadmin peut voir la liste des admins
router.get('/admins', authorize('superadmin'), require('../controllers/adminController').getAllAdmins);

module.exports = router;

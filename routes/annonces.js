const express = require('express');
const {
    createAnnonce,
    getAnnonces,
    getAnnonceById,
    getMyAnnonces,
    updateAnnonce,
    deleteAnnonce,
    getAnnoncesByQuartier
} = require('../controllers/annonceController');
const { protect } = require('../middleware/auth');
const upload = require('../config/multer');

const router = express.Router();

// Routes publiques
router.get('/', getAnnonces);
router.get('/quartier/:quartier', getAnnoncesByQuartier);
router.get('/:id', getAnnonceById);

// Routes protégées
router.post('/', protect, upload.array('images', 10), createAnnonce);
router.get('/user/mes-annonces', protect, getMyAnnonces);
router.put('/:id', protect, upload.array('images', 10), updateAnnonce);
router.delete('/:id', protect, deleteAnnonce);

module.exports = router;

const annonceService = require('../services/annonceService');

// @desc    Créer une nouvelle annonce
// @route   POST /api/annonces
// @access  Private
exports.createAnnonce = async (req, res, next) => {
    try {
        const annonce = await annonceService.createAnnonce({
            ...req.body,
            proprietaire: req.user.id,
            files: req.files
        });

        res.status(201).json({
            success: true,
            message: 'Annonce créée avec succès',
            annonce
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer toutes les annonces validées
// @route   GET /api/annonces
// @access  Public
exports.getAnnonces = async (req, res, next) => {
    try {
        const result = await annonceService.getAnnonces(req.query);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer une annonce par ID
// @route   GET /api/annonces/:id
// @access  Public
exports.getAnnonceById = async (req, res, next) => {
    try {
        const annonce = await annonceService.getAnnonceById(req.params.id, req.user);
        res.status(200).json({ success: true, annonce });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer mes annonces
// @route   GET /api/mes-annonces
// @access  Private
exports.getMyAnnonces = async (req, res, next) => {
    try {
        const result = await annonceService.getMyAnnonces(req.user.id);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

// @desc    Modifier une annonce
// @route   PUT /api/annonces/:id
// @access  Private
exports.updateAnnonce = async (req, res, next) => {
    try {
        const annonce = await annonceService.updateAnnonce(req.params.id, req.user.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Annonce mise à jour avec succès',
            annonce
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer une annonce
// @route   DELETE /api/annonces/:id
// @access  Private
exports.deleteAnnonce = async (req, res, next) => {
    try {
        await annonceService.deleteAnnonce(req.params.id, req.user.id);
        res.status(200).json({
            success: true,
            message: 'Annonce supprimée avec succès'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer les annonces par quartier
// @route   GET /api/annonces/quartier/:quartier
// @access  Public
exports.getAnnoncesByQuartier = async (req, res, next) => {
    try {
        const result = await annonceService.getAnnoncesByQuartier(req.params.quartier, req.query);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

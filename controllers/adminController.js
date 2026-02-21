const adminService = require('../services/adminService');
const jwt = require('jsonwebtoken');

// @desc    Supprimer un utilisateur (admin / superadmin)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin ou Superadmin
exports.deleteUser = async (req, res, next) => {
    try {
        await adminService.deleteUser(req.params.id, req.user.role);
        res.status(200).json({ success: true, message: 'Utilisateur supprimé.' });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer toutes les annonces (admin)
// @route   GET /api/admin/annonces
// @access  Private/Admin ou Superadmin
exports.getAllAnnonces = async (req, res, next) => {
    try {
        const result = await adminService.getAllAnnonces(req.query);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

// @desc    Valider une annonce
// @route   PUT /api/admin/annonces/:id/valider
// @access  Private/Admin
exports.validerAnnonce = async (req, res, next) => {
    try {
        const annonce = await adminService.validerAnnonce(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Annonce validée avec succès',
            annonce
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Refuser une annonce
// @route   PUT /api/admin/annonces/:id/refuser
// @access  Private/Admin ou Superadmin
exports.refuserAnnonce = async (req, res, next) => {
    try {
        const annonce = await adminService.refuserAnnonce(req.params.id, req.body.raison);
        res.status(200).json({
            success: true,
            message: 'Annonce refusée',
            annonce
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer une annonce (admin)
// @route   DELETE /api/admin/annonces/:id
// @access  Private/Admin
exports.deleteAnnonce = async (req, res, next) => {
    try {
        await adminService.deleteAnnonce(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Annonce supprimée avec succès'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les statistiques de modération
// @route   GET /api/admin/stats
// @access  Private/Admin ou Superadmin
exports.getStats = async (req, res, next) => {
    try {
        const stats = await adminService.getStats();
        res.status(200).json({ success: true, stats });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer tous les utilisateurs (standard users)
// @route   GET /api/admin/users
// @access  Private/Admin ou Superadmin
exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await adminService.getAllUsers(req.query);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un utilisateur
// @route   GET /api/admin/users/:id
// @access  Private/Admin ou Superadmin
exports.getUserById = async (req, res, next) => {
    try {
        const user = await adminService.getUserById(req.params.id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// @desc    Vérifier le mot de passe admin
// @route   POST /api/admin/verify-password
// @access  Public (pas besoin d'authentification)
exports.verifyAdminPassword = async (req, res, next) => {
    try {
        const token = await adminService.verifyAdminPassword(req.body.password);
        res.status(200).json({ success: true, message: 'Accès autorisé', token });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer tous les administrateurs (superadmin seulement)
// @route   GET /api/admin/admins
// @access  Private/Superadmin
exports.getAllAdmins = async (req, res, next) => {
    try {
        const result = await adminService.getAllAdmins(req.query);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

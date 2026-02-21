const authService = require('../services/authService');
const { generateToken } = require('../services/authService');

// ================= LOGIN =================
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};

// ================= REGISTER =================
exports.register = async (req, res, next) => {
    try {
        const { nom, prenom, email, password, telephone } = req.body;
        const { token, user } = await authService.register({ nom, prenom, email, password, telephone });
        res.status(201).json({
            success: true,
            message: 'Inscription réussie',
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};

// ================= ME =================
exports.getMe = async (req, res, next) => {
    try {
        const user = await authService.getMe(req.user.id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// ================= LOGOUT =================
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Déconnecté avec succès'
    });
};

// ================= CREATE ADMIN =================
exports.createAdmin = async (req, res) => {
    try {
        const { nom, prenom, email, password, telephone } = req.body;

        if (!nom || !prenom || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Veuillez fournir tous les champs obligatoires' 
            });
        }

        const User = require('../models/user');
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'Un utilisateur avec cet email existe déjà' 
            });
        }

        const user = await User.create({
            nom,
            prenom,
            email,
            password,
            telephone,
            role: 'admin'
        });

        const token = generateToken(user._id, user.role);
        const userData = user.toJSON();

        res.status(201).json({
            success: true,
            message: 'Admin créé avec succès',
            token,
            user: userData
        });

    } catch (error) {
        console.error('Erreur createAdmin:', error);
        res.status(500).json({ success:false, message:'Erreur serveur' });
    }
};

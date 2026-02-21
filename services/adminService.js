const Annonce = require('../models/annonce');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

// supprimer un user (non admin)
async function deleteUser(userId, requesterRole) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorResponse('Utilisateur introuvable', 404);
  }
  // superadmin ne peut pas être supprimé
  if (user.role === 'superadmin') {
    throw new ErrorResponse('Impossible de supprimer le super administrateur.', 403);
  }
  // un admin standard ne peut supprimer que des users 'user'
  if (user.role === 'admin' && requesterRole !== 'superadmin') {
    throw new ErrorResponse('Impossible de supprimer un administrateur.', 403);
  }
  await User.findByIdAndDelete(userId);
}

async function getAllAnnonces(query) {
  const { id, statut, typeTransaction, typeBien, page = 1, limit = 20 } = query;
  if (id) {
    const annonce = await Annonce.findById(id).populate('proprietaire', 'nom prenom email telephone');
    if (!annonce) {
      return { annonces: [], count: 0, total: 0, pages: 0 };
    }
    return { annonces: [annonce], count: 1, total: 1, pages: 1 };
  }
  const filter = {};
  if (statut) filter.statut = statut;
  if (typeTransaction) filter.typeTransaction = typeTransaction;
  if (typeBien) filter.typeBien = typeBien;

  const skip = (page - 1) * limit;

  const annonces = await Annonce.find(filter)
    .populate('proprietaire', 'nom prenom email telephone')
    .sort({ dateCreation: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Annonce.countDocuments(filter);
  return {
    annonces,
    count: annonces.length,
    total,
    pages: Math.ceil(total / limit)
  };
}

async function validerAnnonce(id) {
  const annonce = await Annonce.findById(id);
  if (!annonce) throw new ErrorResponse('Annonce introuvable', 404);
  if (annonce.statut !== 'En attente') {
    throw new ErrorResponse('Cette annonce a déjà été traitée', 400);
  }
  annonce.statut = 'Validée';
  annonce.dateValidation = Date.now();
  annonce.raisionRefus = null;
  annonce.messageAdmin = '✅ Votre annonce a été validée avec succès! Elle est maintenant visible pour tous les utilisateurs.';
  await annonce.save();
  await annonce.populate('proprietaire', 'nom prenom email');
  return annonce;
}

async function refuserAnnonce(id, raison) {
  if (!raison) throw new ErrorResponse('Veuillez fournir une raison de refus', 400);
  const annonce = await Annonce.findById(id);
  if (!annonce) throw new ErrorResponse('Annonce introuvable', 404);
  if (annonce.statut !== 'En attente') {
    throw new ErrorResponse('Cette annonce a déjà été traitée', 400);
  }
  annonce.statut = 'Refusée';
  annonce.raisionRefus = raison;
  annonce.messageAdmin = `❌ Votre annonce n'a pas été validée. Raison: ${raison}. Veuillez corriger les champs et réessayer.`;
  await annonce.save();
  await annonce.populate('proprietaire', 'nom prenom email');
  return annonce;
}

async function deleteAnnonce(id) {
  const annonce = await Annonce.findById(id);
  if (!annonce) throw new ErrorResponse('Annonce introuvable', 404);
  await Annonce.findByIdAndDelete(id);
}

async function getStats() {
  const totalAnnonces = await Annonce.countDocuments();
  const enAttente = await Annonce.countDocuments({ statut: 'En attente' });
  const validees = await Annonce.countDocuments({ statut: 'Validée' });
  const refusees = await Annonce.countDocuments({ statut: 'Refusée' });
  const totalUsers = await User.countDocuments();
  const locations = await Annonce.countDocuments({ typeTransaction: 'Location', statut: 'Validée' });
  const ventes = await Annonce.countDocuments({ typeTransaction: 'Vente', statut: 'Validée' });
  return {
    totalAnnonces,
    enAttente,
    validees,
    refusees,
    totalUsers,
    locations,
    ventes
  };
}

async function getAllUsers(query) {
  const { page = 1, limit = 20 } = query;
  const skip = (page - 1) * limit;
  const users = await User.find({ role: 'user' })
    .select('-password')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });
  const total = await User.countDocuments({ role: 'user' });
  return {
    users,
    count: users.length,
    total,
    pages: Math.ceil(total / limit)
  };
}

async function getUserById(id) {
  const user = await User.findById(id).select('-password');
  if (!user) throw new ErrorResponse('Utilisateur introuvable', 404);
  return user;
}

async function verifyAdminPassword(password) {
  if (!password) throw new ErrorResponse('Mot de passe requis', 400);
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
  if (password === adminPassword) {
    const token = jwt.sign(
      { type: 'admin_session' },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production_12345',
      { expiresIn: '12h' }
    );
    return token;
  } else {
    throw new ErrorResponse('Mot de passe incorrect', 401);
  }
}

async function getAllAdmins(query) {
  const { page = 1, limit = 20 } = query;
  const skip = (page - 1) * limit;
  const admins = await User.find({ role: 'admin' })
    .select('-password')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });
  const total = await User.countDocuments({ role: 'admin' });
  return {
    users: admins,
    count: admins.length,
    total,
    pages: Math.ceil(total / limit)
  };
}

module.exports = {
  deleteUser,
  getAllAnnonces,
  validerAnnonce,
  refuserAnnonce,
  deleteAnnonce,
  getStats,
  getAllUsers,
  getUserById,
  verifyAdminPassword,
  getAllAdmins
};

const Annonce = require('../models/annonce');
const ErrorResponse = require('../utils/errorResponse');

// crée une nouvelle annonce, retourne l'annonce créée
async function createAnnonce({ titre, description, prix, adresse, quartier, typeBien, typeTransaction, proprietaire, files }) {
  // vérification des champs requis
  if (!titre || !description || !prix || !adresse || !quartier || !typeBien || !typeTransaction) {
    throw new ErrorResponse('Veuillez fournir tous les champs obligatoires', 400);
  }

  if (!files || files.length === 0) {
    throw new ErrorResponse('Au moins une image est requise', 400);
  }

  const annonce = await Annonce.create({
    titre,
    description,
    prix: parseFloat(prix),
    adresse,
    quartier,
    typeBien,
    typeTransaction,
    proprietaire,
    images: files.map(f => f.filename),
    statut: 'En attente'
  });

  await annonce.populate('proprietaire', 'nom prenom email');

  return annonce;
}

// récupère les annonces validées avec filtres et pagination
async function getAnnonces({ typeTransaction, typeBien, quartier, page = 1, limit = 12 }) {
  const filter = { statut: 'Validée' };
  if (typeTransaction) filter.typeTransaction = typeTransaction;
  if (typeBien) filter.typeBien = typeBien;
  if (quartier) filter.quartier = new RegExp(quartier, 'i');

  const skip = (page - 1) * limit;
  const annonces = await Annonce.find(filter)
    .populate('proprietaire', 'nom prenom email telephone')
    .sort({ dateValidation: -1 })
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

// récupère une annonce par id et vérifie les droits d'accès
async function getAnnonceById(id, currentUser) {
  const annonce = await Annonce.findById(id)
    .populate('proprietaire', 'nom prenom email telephone');
  if (!annonce) {
    throw new ErrorResponse('Annonce introuvable', 404);
  }

  // si pas validée, vérifier propriétaire ou admin
  if (
    annonce.statut !== 'Validée' &&
    currentUser?.id !== annonce.proprietaire._id.toString() &&
    currentUser?.role !== 'admin'
  ) {
    throw new ErrorResponse('Accès refusé', 403);
  }

  return annonce;
}

async function getMyAnnonces(userId) {
  const annonces = await Annonce.find({ proprietaire: userId })
    .populate('proprietaire', 'nom prenom email')
    .sort({ dateCreation: -1 });

  return { annonces, count: annonces.length };
}

async function updateAnnonce(id, userId, updates) {
  const annonce = await Annonce.findById(id);
  if (!annonce) {
    throw new ErrorResponse('Annonce introuvable', 404);
  }
  if (annonce.proprietaire.toString() !== userId) {
    throw new ErrorResponse("Non autorisé à modifier cette annonce", 403);
  }
  if (annonce.statut !== 'En attente') {
    throw new ErrorResponse(`Vous ne pouvez pas modifier une annonce ${annonce.statut.toLowerCase()}`, 400);
  }

  const fieldsToUpdate = {
    titre: updates.titre,
    description: updates.description,
    prix: updates.prix,
    adresse: updates.adresse,
    quartier: updates.quartier,
    typeBien: updates.typeBien,
    typeTransaction: updates.typeTransaction
  };
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) delete fieldsToUpdate[key];
  });

  const updated = await Annonce.findByIdAndUpdate(id, fieldsToUpdate, {
    new: true,
    runValidators: true
  }).populate('proprietaire', 'nom prenom email');

  return updated;
}

async function deleteAnnonce(id, userId) {
  const annonce = await Annonce.findById(id);
  if (!annonce) {
    throw new ErrorResponse('Annonce introuvable', 404);
  }
  if (annonce.proprietaire.toString() !== userId) {
    throw new ErrorResponse("Non autorisé à supprimer cette annonce", 403);
  }
  await Annonce.findByIdAndDelete(id);
}

async function getAnnoncesByQuartier(quartier, { typeTransaction, page = 1, limit = 12 }) {
  const filter = {
    quartier: new RegExp(quartier, 'i'),
    statut: 'Validée'
  };
  if (typeTransaction) filter.typeTransaction = typeTransaction;

  const skip = (page - 1) * limit;
  const annonces = await Annonce.find(filter)
    .populate('proprietaire', 'nom prenom email')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ dateValidation: -1 });

  const total = await Annonce.countDocuments(filter);
  return {
    annonces,
    count: annonces.length,
    total,
    pages: Math.ceil(total / limit)
  };
}

module.exports = {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  getMyAnnonces,
  updateAnnonce,
  deleteAnnonce,
  getAnnoncesByQuartier
};

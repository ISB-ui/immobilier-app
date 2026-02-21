const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Veuillez fournir un titre'],
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
    },
    description: {
      type: String,
      required: [true, 'Veuillez fournir une description'],
      minlength: [20, 'La description doit contenir au moins 20 caractères']
    },
    prix: {
      type: Number,
      required: [true, 'Veuillez fournir un prix'],
      min: [0, 'Le prix ne peut pas être négatif']
    },
    adresse: {
      type: String,
      required: [true, 'Veuillez fournir une adresse'],
      trim: true
    },
    quartier: {
      type: String,
      required: [true, 'Le quartier est obligatoire'],
      trim: true
    },
    typeBien: {
      type: String,
      enum: {
        values: ['Maison', 'Studio', 'Appartement', 'Boutique', 'Terrain'],
        message: 'Veuillez sélectionner un type de bien valide'
      },
      required: true
    },
    typeTransaction: {
      type: String,
      enum: {
        values: ['Location', 'Vente'],
        message: 'Veuillez sélectionner un type de transaction valide'
      },
      required: true
    },
    statut: {
      type: String,
      enum: {
        values: ['En attente', 'Validée', 'Refusée'],
        message: 'Statut invalide'
      },
      default: 'En attente'
    },
    proprietaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    images: [{
      type: String,
      default: null
    }],
    raisionRefus: {
      type: String,
      default: null
    },
    messageAdmin: {
      type: String,
      default: null
    },
    dateCreation: {
      type: Date,
      default: Date.now
    },
    dateModification: {
      type: Date,
      default: Date.now
    },
    dateValidation: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Index pour les recherches fréquentes
annonceSchema.index({ statut: 1 });
annonceSchema.index({ typeTransaction: 1 });
annonceSchema.index({ typeBien: 1 });
annonceSchema.index({ quartier: 1 });
annonceSchema.index({ proprietaire: 1 });

module.exports = mongoose.model("Annonce", annonceSchema);

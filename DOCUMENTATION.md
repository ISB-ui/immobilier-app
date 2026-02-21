# 📱 Immobilier App - Documentation Complète

## 🎯 Vue d'ensemble

Application web de location et vente de biens immobiliers avec système d'authentification sécurisé, gestion d'annonces et panneau d'administration.

**Stack Technique:**
- Backend: Node.js + Express.js
- Base de données: MongoDB
- Frontend: HTML5, CSS3, Bootstrap 5
- Authentification: JWT

---

## 📁 Structure du Projet

```
immobilier-app/
├── config/
│   └── database.js          # Configuration MongoDB
├── controllers/
│   ├── authController.js    # Authentification
│   ├── annonceController.js # Gestion annonces
│   └── adminController.js   # Panneau admin
├── middleware/
│   └── auth.js              # Protection JWT & rôles
├── models/
│   ├── user.js              # Schéma utilisateur
│   └── annonce.js           # Schéma annonce
├── routes/
│   ├── auth.js              # Routes authentification
│   ├── annonces.js          # Routes annonces
│   └── admin.js             # Routes admin
├── public/
│   ├── index.html           # Accueil
│   ├── login.html           # Connexion
│   ├── register.html        # Inscription
│   ├── locations.html       # Annonces en location
│   ├── ventes.html          # Annonces en vente
│   ├── ajouter-annonce.html # Formulaire publication
│   ├── mes-annonces.html    # Mes annonces (user)
│   ├── annonce-detail.html  # Détails annonce
│   └── admin-panel.html     # Panneau admin
├── uploads/                 # Dossier images
├── .env                     # Variables d'environnement
├── package.json             # Dépendances
├── server.js                # Fichier principal
└── LOGIN_SETUP.md          # Doc authentification
```

---

## 🚀 Installation & Démarrage

### 1️⃣ Prérequis
- Node.js (v14+)
- MongoDB installé et en cours d'exécution
- NPM ou Yarn

### 2️⃣ Installation

```bash
# Cloner le repository
git clone <repo-url>
cd immobilier-app

# Installer les dépendances
npm install
```

### 3️⃣ Configuration

Créer/modifier le fichier `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/immobilier
JWT_SECRET=votre_cle_secrete_super_securisee
JWT_EXPIRE=7d
```

### 4️⃣ Démarrage

```bash
# Mode développement
npx nodemon server.js

# Mode production
npm start
```

Le serveur sera accessible sur: `http://localhost:5000`

---

## 👥 Rôles & Autorisations

### User (Utilisateur régulier)
- ✅ S'inscrire et se connecter
- ✅ Consulter annonces validées
- ✅ Publier des annonces (statut: En attente)
- ✅ Modifier annonces en attente
- ✅ Supprimer propres annonces
- ✅ Voir ses annonces et leur statut

### Admin (Administrateur)
- ✅ Toutes les permissions utilisateur
- ✅ Voir TOUTES les annonces (tous statuts)
- ✅ Valider les annonces
- ✅ Refuser les annonces avec justification
- ✅ Supprimer n'importe quelle annonce
- ✅ Gérer les utilisateurs
- ✅ Voir les statistiques

---

## 📡 API Endpoints

### 🔐 Authentification (`/api/auth`)

#### Inscription
```
POST /api/auth/register
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "password": "motdepasse123",
  "telephone": "+33612345678"
}

Response (201):
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": "...", "role": "user", ... }
}
```

#### Connexion
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "jean@example.com",
  "password": "motdepasse123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": "...", "role": "user", ... }
}
```

---

### 📢 Annonces (`/api/annonces`)

#### Créer une annonce
```
POST /api/annonces
Authorization: Bearer <token>
Content-Type: multipart/form-data

Fields:
- titre (string, required)
- description (string, required, min 20 chars)
- prix (number, required, > 0)
- adresse (string, required)
- quartier (string, required)
- typeBien (enum: Maison, Studio, Appartement, Boutique, Terrain)
- typeTransaction (enum: Location, Vente)
- images (file array, required, min 1)

Response (201):
{
  "success": true,
  "annonce": { ... }
}
```

#### Récupérer annonces validées
```
GET /api/annonces?typeTransaction=Location&typeBien=Appartement&quartier=Centre&page=1&limit=12

Response (200):
{
  "success": true,
  "count": 10,
  "total": 45,
  "pages": 5,
  "annonces": [...]
}
```

#### Récupérer une annonce
```
GET /api/annonces/:id

Response (200):
{
  "success": true,
  "annonce": { ... }
}
```

#### Mes annonces
```
GET /api/mes-annonces
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 5,
  "annonces": [...]
}
```

#### Modifier annonce
```
PUT /api/annonces/:id
Authorization: Bearer <token>
Content-Type: application/json

{ "titre": "...", "prix": "...", ... }

Response (200):
{
  "success": true,
  "annonce": { ... }
}
```

#### Supprimer annonce
```
DELETE /api/annonces/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Annonce supprimée"
}
```

---

### 🛡️ Administration (`/api/admin`)

**⚠️ Toutes les routes admin nécessitent le rôle 'admin'**

#### Récupérer annonces (tous statuts)
```
GET /api/admin/annonces?statut=En%20attente&typeBien=Maison&page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "annonces": [...]
}
```

#### Valider une annonce
```
PUT /api/admin/annonces/:id/valider
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "annonce": { "statut": "Validée", ... }
}
```

#### Refuser une annonce
```
PUT /api/admin/annonces/:id/refuser
Authorization: Bearer <token>
Content-Type: application/json

{
  "raison": "Titre inapproprié"
}

Response (200):
{
  "success": true,
  "annonce": { "statut": "Refusée", "raisionRefus": "..." }
}
```

#### Supprimer annonce (admin)
```
DELETE /api/admin/annonces/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true
}
```

#### Statistiques
```
GET /api/admin/stats
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "stats": {
    "totalAnnonces": 150,
    "enAttente": 25,
    "validees": 120,
    "refusees": 5,
    "totalUsers": 45,
    "locations": 80,
    "ventes": 40
  }
}
```

#### Récupérer utilisateurs
```
GET /api/admin/users?page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "users": [...]
}
```

---

## 🎨 Pages Frontend

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/index.html` | Vue d'ensemble, filtres, annonces validées |
| Connexion | `/login.html` | Formulaire de connexion |
| Inscription | `/register.html` | Créer un compte |
| En location | `/locations.html` | Annonces de location |
| En vente | `/ventes.html` | Annonces de vente |
| Ajouter | `/ajouter-annonce.html` | Publier une annonce |
| Mes annonces | `/mes-annonces.html` | Gestion propres annonces |
| Détails | `/annonce-detail.html?id=:id` | Vue complète d'une annonce |
| Admin | `/admin-panel.html` | Panneau d'administration |

---

## 🔄 Flux d'une Annonce

```
1. Utilisateur remplit formulaire "Ajouter"
   ↓
2. Annonce créée avec statut "En attente"
   ↓
3. Admin vérifie dans le panneau Admin
   ├─ ✅ Valide → Statut = "Validée" → Visible publiquement
   └─ ❌ Refuse → Statut = "Refusée" + Raison → Utilisateur voit raison
```

---

## 🔒 Sécurité

✅ **Implémentée:**
- Hachage bcryptjs des mots de passe (10 rounds)
- Authentification JWT avec expiration (7 jours)
- Middleware de protection des routes
- Validation côté serveur
- Gestion des rôles
- Protection contre l'accès non autorisé
- Mots de passe jamais retournés dans les réponses

⚠️ **À Ajouter (V2):**
- HTTPS en production
- Rate limiting
- CSRF protection
- Cookies httpOnly
- Validation des fichiers images
- Compression des images
- Stockage cloud pour images (AWS S3, etc.)

---

## 📊 Modèles de Données

### User
```javascript
{
  _id: ObjectId,
  nom: String,
  prenom: String,
  email: String (unique),
  password: String (hashed),
  telephone: String,
  adresse: String,
  role: "user" | "admin",
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Annonce
```javascript
{
  _id: ObjectId,
  titre: String,
  description: String,
  prix: Number,
  adresse: String,
  quartier: String,
  typeBien: "Maison" | "Studio" | "Appartement" | "Boutique" | "Terrain",
  typeTransaction: "Location" | "Vente",
  statut: "En attente" | "Validée" | "Refusée",
  proprietaire: ObjectId (ref: User),
  images: [String],           // Array de noms fichiers
  raisionRefus: String,       // Null ou raison refus
  dateCreation: Date,
  dateModification: Date,
  dateValidation: Date
}
```

---

## 🐛 Débogage

### Logs utiles
```bash
# Voir logs MongoDB
# Vérifier JWT_SECRET dans .env
# Vérifier permissions admin
# Vérifier format images
```

### Erreurs courantes

| Erreur | Solution |
|--------|----------|
| "Non autorisé" | Vérifier JWT valide et non expiré |
| "Email existe déjà" | Utiliser email différent |
| "Annonce introuvable" | Vérifier ID annonce valide |
| "Pas d'images" | Sélectionner au moins une image |
| "Accès refusé (admin)" | Utiliser compte admin |

---

## 🚀 Prochaines Évolutions (V2)

- [ ] Recherche avancée par quartier
- [ ] Système de favoris
- [ ] Messagerie interne
- [ ] Notifications email/SMS
- [ ] Paiement en ligne (Stripe)
- [ ] Géolocalisation interactive (Google Maps)
- [ ] Application mobile (React Native)
- [ ] Export PDF annonces
- [ ] Statistiques détaillées
- [ ] Import/Export données

---

## 📞 Support

Pour toute question ou problème:
1. Vérifier la documentation
2. Consulter les logs serveur
3. Vérifier la base de données
4. Tester avec Postman/Thunder Client

---

## 📝 Licence

Propriétaire - Tous droits réservés © 2026

---

**Dernière mise à jour:** 21 janvier 2026

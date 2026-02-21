# 📝 Guide : Créer un Admin avec le Script

## 🎯 Objectif
Créer automatiquement un utilisateur **admin** dans MongoDB qui peut :
- Se connecter à l'application
- Accéder au panneau d'administration
- Valider/refuser les annonces des utilisateurs

---

## 🔧 Comment ça marche (Explication du Script)

### 1️⃣ **Imports des dépendances**
```javascript
const mongoose = require('mongoose');  // Connexion à MongoDB
const bcrypt = require('bcryptjs');    // Hachage des mots de passe
const User = require('./models/user'); // Modèle utilisateur
```

### 2️⃣ **Connexion à MongoDB**
```javascript
await mongoose.connect(process.env.MONGO_URI);
```
- Le script se connecte à la base de données définie dans `.env`
- Par défaut : `mongodb://127.0.0.1:27017/immobilier`

### 3️⃣ **Vérification de l'existence**
```javascript
const existingUser = await User.findOne({ email: adminData.email });
```
- Vérifie si un utilisateur avec cet email existe déjà
- Évite les doublons

### 4️⃣ **Création de l'utilisateur**
```javascript
const admin = await User.create(adminData);
```
- Crée un nouvel utilisateur dans MongoDB
- Le mot de passe est **automatiquement hashé** par le middleware Mongoose
- Le rôle est défini à `'admin'`

### 5️⃣ **Affichage des infos**
- Affiche les identifiants et instructions de connexion

---

## ⚙️ Comment exécuter le script

### Étape 1 : Assurez-vous que MongoDB est en cours d'exécution
```powershell
mongod
```

### Étape 2 : Exécutez le script
```powershell
cd c:\Users\utilisateur\immobilier-app
node scripts/create-admin.js
```

### Étape 3 : Vous verrez :
```
📡 Connexion à MongoDB...
✅ Connecté à MongoDB
🔍 Vérification si l'utilisateur existe...
👤 Création de l'utilisateur admin...

✅ ✅ ✅ ADMIN CRÉÉ AVEC SUCCÈS! ✅ ✅ ✅

📋 Informations de l'admin:
──────────────────────────────────────────────────
ID: 507f1f77bcf86cd799439011
Nom: Admin Manager
Email: admin@immobilier.com
Rôle: admin
Date création: 2026-01-22T10:30:00.000Z
──────────────────────────────────────────────────
```

---

## 🔐 Utilisation de l'Admin Créé

### Connexion 1️⃣ : Utilisateur Normal
**URL:** http://localhost:5000/login.html
- **Email:** admin@immobilier.com
- **Mot de passe:** AdminPassword123456

### Connexion 2️⃣ : Panneau Admin
**URL:** http://localhost:5000/admin-login.html
- **Mot de passe:** isb  akatsuki

---

## 📊 Différence entre les deux connexions

| Connexion | URL | Authentification | Accès |
|-----------|-----|------------------|-------|
| **Utilisateur** | `/login.html` | Email + Mot de passe JWT | Ses propres annonces |
| **Admin** | `/admin-login.html` | Mot de passe admin seulement | Toutes les annonces |

---

## 🛠️ Personnaliser les données de l'Admin

Vous pouvez modifier les infos dans le script `scripts/create-admin.js` :

```javascript
const adminData = {
    nom: 'Admin',           // ← Changez le nom
    prenom: 'Manager',      // ← Changez le prénom
    email: 'admin@immobilier.com',  // ← Changez l'email
    password: 'AdminPassword123456', // ← Changez le mot de passe
    telephone: '0123456789', // ← Changez le téléphone
    role: 'admin'
};
```

Puis exécutez le script à nouveau.

---

## 🎯 Flux Complet (Admin validant une annonce)

```
1. Utilisateur normal crée une annonce
   ↓
2. Annonce créée avec statut "En attente"
   ↓
3. Admin se connecte (admin-login.html)
   ↓
4. Admin voit l'annonce en attente
   ↓
5. Admin clique "✓ Valider"
   ↓
6. Annonce passe au statut "Validée"
   ↓
7. Annonce visible pour tous les utilisateurs sur l'accueil
   ↓
8. Utilisateurs peuvent voir la propriété et contacter le propriétaire
```

---

## ✅ Vérification dans MongoDB

Pour vérifier que l'admin a été créé :

```powershell
mongo
use immobilier
db.users.find({role: "admin"}).pretty()
```

Vous verrez :
```javascript
{
  "_id": ObjectId("..."),
  "nom": "Admin",
  "prenom": "Manager",
  "email": "admin@immobilier.com",
  "password": "$2a$10$...", // Hashé
  "role": "admin",
  "telephone": "0123456789",
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

---

## 🚀 Vous êtes prêt !

Exécutez le script et commencez à valider les annonces ! 🎉

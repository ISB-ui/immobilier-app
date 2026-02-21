# 🚀 Quick Start Guide - Immobilier App

## ⚡ Démarrage en 5 minutes

### ✅ Étape 1: Vérifier MongoDB
```powershell
# Vérifier que MongoDB est en cours d'exécution
# Ouvrir une fenêtre PowerShell et exécuter:
mongod

# Vous devriez voir: "waiting for connections on port 27017"
```

### ✅ Étape 2: Installer les dépendances
```powershell
cd c:\Users\utilisateur\immobilier-app
npm install
```

### ✅ Étape 3: Démarrer le serveur
```powershell
# Terminal 1: Lancer le serveur
npx nodemon server.js

# Vous devriez voir: "Serveur lancé sur le port 5000"
```

### ✅ Étape 4: Ouvrir l'application
Ouvrir votre navigateur et accéder à:
```
http://localhost:5000/index.html
```

---

## 📋 Checklist de Test

### Test 1: Inscription
- [ ] Aller à http://localhost:5000/register.html
- [ ] Remplir le formulaire (nom, prénom, email, mot de passe)
- [ ] Cliquer "S'inscrire"
- [ ] Être redirigé vers le dashboard

### Test 2: Connexion
- [ ] Aller à http://localhost:5000/login.html
- [ ] Entrer email et mot de passe
- [ ] Cliquer "Se connecter"
- [ ] Être redirigé vers l'accueil

### Test 3: Créer une annonce
- [ ] Cliquer sur "Ajouter" dans le menu
- [ ] Remplir tous les champs:
  - Titre: "Bel appartement 2 pièces"
  - Description: "Très lumineux avec balcon..."
  - Prix: 800
  - Adresse: "123 rue de la Paix"
  - Quartier: "Centre-ville"
  - Type: "Appartement"
  - Transaction: "Location"
  - Images: Sélectionner 1+ images
- [ ] Cliquer "Publier l'annonce"
- [ ] Message "Annonce publiée avec succès"

### Test 4: Voir ses annonces
- [ ] Cliquer sur "Mes annonces"
- [ ] Voir l'annonce avec statut "⏳ En attente"

### Test 5: Voir annonces publiques
- [ ] Aller à l'accueil
- [ ] Annonce ne devrait PAS y être (statut En attente)
- [ ] Cliquer "En location" ou "En vente"
- [ ] Idem - annonce non visible

### Test 6: Admin - Valider annonce
⚠️ **Préalable:** Créer compte admin dans MongoDB

```javascript
// Dans MongoDB:
db.users.insertOne({
  nom: "Admin",
  prenom: "Test",
  email: "admin@test.com",
  password: "Admin123456", // Sera auto-hashé à la création
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

- [ ] Se connecter avec admin@test.com / Admin123456
- [ ] Aller à http://localhost:5000/admin-panel.html
- [ ] Voir la statistique "En attente: 1"
- [ ] Voir l'annonce dans la liste
- [ ] Cliquer "✓ Valider"
- [ ] Annonce passe à "✅ Validée"

### Test 7: Voir annonce validée
- [ ] Se déconnecter (ou autre compte)
- [ ] Aller à l'accueil
- [ ] Cliquer "En location"
- [ ] L'annonce publiée devrait y être! ✅
- [ ] Cliquer dessus pour voir détails

### Test 8: Admin - Refuser annonce
- [ ] Créer une 2ème annonce
- [ ] Admin > Cliquer "Refuser"
- [ ] Entrer raison: "Images de mauvaise qualité"
- [ ] Confirmer
- [ ] Annonce passe à "❌ Refusée"
- [ ] Utilisateur peut voir raison dans "Mes annonces"

---

## 🎯 Flux Complet à Tester

```
1. Utilisateur s'inscrit (register.html)
   ↓
2. Se connecte (login.html)
   ↓
3. Crée annonce (ajouter-annonce.html)
   Statut: En attente ⏳
   ↓
4. Voit annonce dans "Mes annonces"
   ↓
5. Admin se connecte avec compte admin
   ↓
6. Admin valide annonce (admin-panel.html)
   Statut: Validée ✅
   ↓
7. Utilisateur normal voit annonce publique
   Dans Accueil, "En location", "En vente"
   ↓
8. Utilisateur clique annonce → Voir détails
```

---

## 🛠️ Commandes Utiles

### Redémarrer le serveur
```powershell
# Ctrl+C pour arrêter
# Relancer avec:
npx nodemon server.js
```

### Accéder à MongoDB
```powershell
# Dans nouveau terminal:
mongo

# Voir les bases:
show dbs

# Utiliser la base immobilier:
use immobilier

# Voir collections:
show collections

# Voir utilisateurs:
db.users.find().pretty()

# Voir annonces:
db.annonces.find().pretty()
```

### Réinitialiser la base
```powershell
# Supprimer toutes les données (ATTENTION!):
mongo
use immobilier
db.dropDatabase()
```

---

## 🔐 Comptes de Test Rapides

### Créer un admin
```javascript
// Dans MongoDB (mongo shell):
use immobilier
db.users.insertOne({
  nom: "Admin",
  prenom: "Test",
  email: "admin@test.fr",
  password: "$2a$10$...", // Ou laisser password normal, sera hashé à login
  role: "admin",
  createdAt: new Date()
})
```

### Créer un utilisateur normal
```bash
# Via l'application:
# Aller à register.html
# Email: user@test.fr
# Mot de passe: Test123456
```

---

## 🐛 Troubleshooting

### ❌ "Cannot GET /index.html"
→ Vérifier serveur lancé sur port 5000
→ URL correcte: http://localhost:5000/index.html

### ❌ "Erreur de connexion à MongoDB"
→ Vérifier mongod en cours d'exécution
→ Vérifier `.env` a `MONGO_URI=mongodb://127.0.0.1:27017/immobilier`

### ❌ "Non autorisé à accéder à cette route"
→ Vérifier token JWT valide
→ Vérifier localStorage.getItem('token')

### ❌ "L'utilisateur avec le rôle 'user' n'est pas autorisé"
→ Essayer avec compte admin
→ Ou créer admin dans MongoDB avec `role: "admin"`

### ❌ Les images ne s'affichent pas
→ Vérifier dossier `uploads/` existe
→ Vérifier images uploadées correctement

---

## 📊 Architecture Résumée

```
CLIENT (Browser)
    ↓
HTML Pages
    ↓
JavaScript (fetch API)
    ↓
    → http://localhost:5000/api/...
    ↓
NODE.JS EXPRESS SERVER
    ↓
Controllers
    ↓
MongoDB Database
```

---

## 🎨 Pages Principales

| Page | URL | Accès |
|------|-----|-------|
| Accueil | / | Public |
| Connexion | /login.html | Public |
| Inscription | /register.html | Public |
| En location | /locations.html | Public |
| En vente | /ventes.html | Public |
| Ajouter | /ajouter-annonce.html | Connecté |
| Mes annonces | /mes-annonces.html | Connecté |
| Détails annonce | /annonce-detail.html?id=:id | Public |
| Admin | /admin-panel.html | Admin seulement |

---

## ✨ Features à Essayer

1. **Filtres de recherche**
   - Type de transaction (Location/Vente)
   - Type de bien (Maison/Studio/Apt/Boutique/Terrain)
   - Quartier (tape du texte)

2. **Upload d'images**
   - Ajouter plusieurs images
   - Voir galerie d'images

3. **Pagination**
   - Voir page 1, 2, 3...
   - Cliquer sur numéro page

4. **Admin features**
   - Voir statistiques
   - Filtrer annonces par statut
   - Valider/Refuser/Supprimer

---

## 🚀 Prêt à Tester!

Votre application est complètement fonctionnelle. 

**Commencez par:**
1. S'inscrire
2. Créer une annonce
3. Utiliser compte admin pour valider
4. Voir annonce publique

Bon test! 🎉

---

**Besoin d'aide?**
→ Consulter `DOCUMENTATION.md` pour l'API complète
→ Consulter `IMPLEMENTATION_SUMMARY.md` pour le cahier des charges

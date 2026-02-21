 # Page de Connexion - Immobilier App

## 📋 Vue d'ensemble

J'ai créé un système d'authentification complet pour votre application immobilière avec une page de connexion et d'inscription élégante.

## 📦 Fichiers créés

### Frontend
- `public/login.html` - Page de connexion
- `public/register.html` - Page d'inscription

### Backend
- `models/user.js` - Modèle utilisateur MongoDB
- `controllers/authController.js` - Contrôleur pour l'authentification
- `routes/auth.js` - Routes d'authentification
- `middleware/auth.js` - Middleware de protection JWT

### Configuration
- `server.js` - Mis à jour avec les routes d'authentification
- `package.json` - Mises à jour des dépendances
- `.env` - Configuration avec JWT_SECRET

## 🚀 Démarrage rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration du fichier `.env`
Modifiez le fichier `.env` avec vos paramètres :
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/immobilier
JWT_SECRET=votre_cle_secrete_changez_en_production
JWT_EXPIRE=7d
```

### 3. Démarrer le serveur
```bash
npm start
# ou pour le développement avec nodemon
npx nodemon server.js
```

### 4. Accéder à l'application
- Page de connexion : `http://localhost:5000/login`
- Page d'inscription : `http://localhost:5000/register`

## 🔐 Fonctionnalités

### Page de Connexion
- ✅ Connexion par email/mot de passe
- ✅ "Se souvenir de moi" (localStorage)
- ✅ Validation des formulaires
- ✅ Messages d'erreur/succès
- ✅ Design responsive
- ✅ Animation de chargement

### Page d'Inscription
- ✅ Création de compte
- ✅ Validation des champs
- ✅ Vérification des mots de passe
- ✅ Champ téléphone optionnel
- ✅ Design moderne et responsive

### Backend
- ✅ Hachage sécurisé des mots de passe (bcryptjs)
- ✅ Authentification JWT
- ✅ Middleware de protection
- ✅ Gestion des erreurs

## 📡 Endpoints API

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/auth/me` (protégé) - Obtenir l'utilisateur actuel
- `GET /api/auth/logout` (protégé) - Déconnexion

### Payload de connexion
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

### Payload d'inscription
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "password": "password123",
  "telephone": "+33612345678"
}
```

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans les fichiers HTML (login.html et register.html) :
- Couleur primaire : `#667eea`
- Couleur secondaire : `#764ba2`

### Messages
Les messages d'erreur et de succès sont personnalisables dans les contrôleurs.

## 🔒 Sécurité

- Les mots de passe sont hachés avec bcryptjs (10 rounds)
- Les tokens JWT ont une durée d'expiration (7 jours par défaut)
- Les mots de passe ne sont jamais retournés dans les réponses API
- Validation des emails avec regex
- Contrainte d'unicité sur les emails

## 📱 Design Responsive

Le design s'adapte automatiquement aux écrans mobiles et de bureau.

## 🛠️ Prochaines étapes

Pour améliorer votre système :
1. Ajouter une page de récupération de mot de passe
2. Implémenter la confirmation d'email
3. Ajouter la validation 2FA
4. Créer un dashboard utilisateur
5. Ajouter des rôles d'utilisateur (admin, agent, client)

## 📝 Notes

- Le token JWT est stocké dans `localStorage` (considérez `httpOnly` cookies pour plus de sécurité)
- Changez `JWT_SECRET` en production avec une valeur forte
- Assurez-vous que MongoDB est en cours d'exécution

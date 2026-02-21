// Script pour créer un utilisateur ADMIN dans MongoDB
// Ce script se connecte à MongoDB et crée un nouvel utilisateur avec le rôle 'admin'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Importer le modèle User (chemin depuis le dossier scripts)
const User = require('../models/user');

// Fonction principale
async function createAdmin() {
    try {
        // 1️⃣ Connexion à MongoDB
        console.log('📡 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        // 2️⃣ Données de l'admin (à modifier selon vos besoins)
        // Vous pouvez passer le rôle en argument CLI (admin ou superadmin)
        const roleArg = process.argv[2] || 'admin';
        const adminData = {
            nom: 'Sasse',
            prenom: 'Andre-Georges',
            email: 'sasseadr@gmail.com',
            password: 'isb  akatsuki', // Sera hashé automatiquement
            telephone: '065746142',
            role: roleArg === 'superadmin' ? 'superadmin' : 'admin'
        };

        // 3️⃣ Vérifier si l'admin existe déjà
        console.log('🔍 Vérification si l\'utilisateur existe...');
        const existingUser = await User.findOne({ email: adminData.email });
        
        if (existingUser) {
            console.log('⚠️  Un utilisateur avec cet email existe déjà!');
            console.log('Email:', existingUser.email);
            console.log('Rôle:', existingUser.role);
            process.exit(1);
        }

        // 4️⃣ Créer l'utilisateur admin
        console.log(`👤 Création de l'utilisateur ${adminData.role}...`);
        const admin = await User.create(adminData);
        
        // 5️⃣ Afficher les infos de l'admin créé
        console.log(`\n✅ ✅ ✅ ${adminData.role.toUpperCase()} CRÉÉ AVEC SUCCÈS! ✅ ✅ ✅\n`);
        console.log('📋 Informations de l\'admin:');
        console.log('─'.repeat(50));
        console.log('ID:', admin._id);
        console.log('Nom:', admin.nom, admin.prenom);
        console.log('Email:', admin.email);
        console.log('Rôle:', admin.role);
        console.log('Date création:', admin.createdAt);
        console.log('─'.repeat(50));

        console.log('\n🔐 Identifiants de connexion:');
        console.log('─'.repeat(50));
        console.log('Email: ' + adminData.email);
        console.log('Mot de passe: ' + '*'.repeat(adminData.password.length));
        console.log('Rôle du compte:', adminData.role);
        console.log('─'.repeat(50));

        console.log('\n📝 FLUX D\'UTILISATION:');
        console.log('1. Se connecter sur http://localhost:5000/admin-login.html');
        console.log('   - Email:', adminData.email);
        console.log('   - Mot de passe: ' + '*'.repeat(adminData.password.length));
        console.log('\n2. Accéder au panneau admin pour valider les annonces et gérer les usagers!');
        console.log('─'.repeat(50));

        process.exit(0);

    } catch (error) {
        console.error('❌ ERREUR:', error.message);
        process.exit(1);
    }
}

// Exécuter le script
createAdmin();

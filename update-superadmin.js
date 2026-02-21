const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

async function updateToSuperAdmin() {
    try {
        console.log('📡 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté');

        const result = await User.findOneAndUpdate(
            { email: 'sasseadr@gmail.com' },
            { role: 'superadmin' },
            { new: true }
        );

        if (result) {
            console.log('\n✅ Compte mis à jour avec succès!');
            console.log('Nom:', result.nom, result.prenom);
            console.log('Email:', result.email);
            console.log('Rôle:', result.role);
        } else {
            console.log('❌ Compte non trouvé');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        process.exit(1);
    }
}

updateToSuperAdmin();

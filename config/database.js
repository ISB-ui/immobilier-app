const mongoose = require("mongoose");

/**
 * Connexion à MongoDB
 * ❌ PAS de process.exit() en développement
 * ✔️ On log seulement
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error.message);
    // IMPORTANT : on NE quitte PAS le process en DEV
  }
};

module.exports = connectDB;

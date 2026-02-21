require("dotenv").config();
const mongoose = require("mongoose");
const Annonce = require("../models/annonce");
const connectDB = require("../config/database");

/**
 * Script de migration pour corriger les chemins des images
 * Convertit les chemins complets (/uploads/filename) en juste le filename
 */

async function migrateImages() {
  try {
    await connectDB();
    console.log("✅ Connecté à MongoDB");

    // Récupère toutes les annonces avec des images
    const annonces = await Annonce.find({ images: { $exists: true, $ne: [] } });
    console.log(`📋 ${annonces.length} annonces trouvées avec des images`);

    let updateCount = 0;
    let errorCount = 0;

    for (const annonce of annonces) {
      try {
        const oldImages = [...annonce.images];
        
        // Corrige chaque image
        annonce.images = annonce.images.map(img => {
          // Si l'image commence par /uploads/, enlève ce préfixe
          if (img.startsWith("/uploads/")) {
            return img.replace("/uploads/", "");
          }
          return img;
        });

        // Vérifie s'il y a eu des changements
        const hasChanged = oldImages.some((img, idx) => img !== annonce.images[idx]);

        if (hasChanged) {
          await annonce.save();
          updateCount++;
          console.log(`✅ Annonce "${annonce.titre}" corrigée`);
          console.log(`   Images: ${oldImages} → ${annonce.images}`);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Erreur pour annonce ${annonce._id}:`, error.message);
      }
    }

    console.log("\n=== RÉSUMÉ ===");
    console.log(`✅ ${updateCount} annonces mises à jour`);
    console.log(`❌ ${errorCount} erreurs`);
    console.log(`⏭️  ${annonces.length - updateCount - errorCount} annonces sans changement`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error);
    process.exit(1);
  }
}

migrateImages();

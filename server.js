require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/database");

const authRoutes = require("./routes/auth");
const annonceRoutes = require("./routes/annonces");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// charger le middleware d'erreur (sera appliqué APRES les routes)
const errorHandler = require('./middleware/error');

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/annonces", annonceRoutes);
app.use("/api/admin", adminRoutes);

// middleware de gestion des erreurs, placé après la déclaration des routes
app.use(errorHandler);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * DÉMARRAGE CONTRÔLÉ
 * ⛔️ Le serveur ne démarre QUE si MongoDB est connecté
 */
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`✅ Serveur lancé sur le port ${PORT}`);
      console.log(`🟢 Serveur ACTIF et prêt à recevoir les requêtes`);
    });

    // Maintenir le serveur actif
    server.on('error', (error) => {
      console.error('❌ Erreur serveur:', error);
    });

    // Gestion des erreurs non capturées
    process.on('uncaughtException', (error) => {
      console.error(' Erreur non capturée:', error);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error(' Promesse rejetée:', reason);
    });

  } catch (error) {
    console.error(" Impossible de démarrer le serveur :", error);
    process.exit(1);
  }
};

startServer();

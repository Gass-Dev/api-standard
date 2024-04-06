require('dotenv').config();

const DB_URI = process.env.DB_URI;

const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect(DB_URI)
  .then(() => {
    console.log("Connexion à la base de données MongoDB réussie !");
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données :", error);
    process.exit(1); // Arrêter l'application en cas d'échec de connexion
  });
};

module.exports = { connect };

// generateSecretKey.js
const crypto = require('crypto');

// Fonction pour générer une clé secrète aléatoire
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = generateSecretKey;

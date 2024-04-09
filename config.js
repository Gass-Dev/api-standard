const crypto = require("crypto");

// Fonction pour générer une clé secrète aléatoire
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

// localStorage
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");

const getUser = (req, res) => {
  const userId = req.params.userId;
  const user = localStorage.getItem(userId); // Récupère l'utilisateur à partir du stockage local
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
};

const saveUser = (req, res) => {
  const userId = req.body.userId;
  const userData = req.body.userData;
  localStorage.setItem(userId, userData); // Stocke les données utilisateur dans le stockage local
  res.json({ message: "Utilisateur enregistré avec succès" });
};

localStorage.clear();

module.exports = { generateSecretKey, getUser, saveUser };

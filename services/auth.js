const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateSecretKey } = require("../config");
const User = require("../models/user");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Vérifie si l'utilisateur existe dans la base de données
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // Vérifie si le mot de passe est correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    // Génère un token JWT pour l'utilisateur authentifié
    const token = jwt.sign({ userId: user._id }, generateSecretKey(), { // Utilise la fonction generateSecretKey pour obtenir la clé secrète
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser };

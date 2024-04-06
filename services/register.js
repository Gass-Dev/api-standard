const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateSecretKey = require("../config");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifie si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Hache le mot de passe avant de le stocker dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée un nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Génère un token JWT pour le nouvel utilisateur
    const token = jwt.sign({ userId: newUser._id }, generateSecretKey(), {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };

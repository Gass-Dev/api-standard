const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un utilisateur par son ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hacher le nouveau mot de passe si fourni
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    await User.findByIdAndUpdate(req.params.id, {
      username,
      email,
      password: hashedPassword,
    });
    res.json({ message: "Utilisateur mis à jour" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion de l'utilisateur
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};

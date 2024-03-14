const User = require("../models/user");

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password)
    const user = new User({ username, email, password });
    await user.save().then(() => {
      res.status(201).json(user);
    });
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
    await User.findByIdAndUpdate(req.params.id, { username, email, password });
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

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };

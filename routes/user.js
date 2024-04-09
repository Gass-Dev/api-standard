const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { loginUser } = require("../services/auth");
const { registerUser } = require("../services/register");
// const cacheMiddleware = require("../middlewares/cacheMiddleware.js");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;

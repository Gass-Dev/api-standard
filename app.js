const express = require("express");
const { connect } = require("./db/connect");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3002;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Définition des routes
app.use("/api/v1", userRouter);

// Route de test
app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hello from Express!");
});

// Connexion à la base de données
connect();

app.listen(PORT, () => {
  console.log("Lancé sur le port", PORT);
});

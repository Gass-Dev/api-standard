const express = require("express");
const http = require("http");
const { generateSecretKey } = require("./config");
const { connect } = require("./db/connect");
// const redis = require('redis');
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user");
const websocketMiddleware = require("./middlewares/webSocket");
const cacheMiddleware = require("./middlewares/cacheMiddleware");

const app = express();
const PORT = process.env.PORT;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Utiliser le middleware CORS
app.use(cors());

// Définition des routes
app.use("/api/v1", userRouter);

// Création du serveur HTTP
const server = http.createServer(app);

// Utilisation du middleware websocket
websocketMiddleware(server);

// // Utilisez le middleware de cache
// app.use(cacheMiddleware);

// Route de test
app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hello from Express!");
});

// Connexion à la base de données
connect();

// Démarrage du serveur
server.listen(PORT, () => {
  console.log("Lancé sur le port", PORT);
});

// Générer une clé secrète
const secretKey = generateSecretKey();
console.log("Clé secrète générée :", secretKey);

// // Créer une seule instance du client Redis
// const client = redis.createClient();

// // Gérer les erreurs de connexion Redis
// client.on("error", (err) => {
//     console.error("Erreur Redis :", err);
// });

// // Connexion au client Redis
// client.on('connect', function() {
//   console.log('Connected to Redis!');
// });

// module.exports = client;

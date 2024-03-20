const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { connect } = require("./db/connect");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3002;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Définition des routes
app.use("/api/v1", userRouter);

// Création du serveur HTTP
const server = http.createServer(app);

// Initialisation de Socket.io
const io = socketIo(server);

// Middleware pour gérer les connexions WebSocket
io.on("connection", (socket) => {
  console.log("Nouvelle connexion WebSocket établie");

  // Gérer les événements WebSocket ici...

  // Exemple d'événement de chat
  socket.on("chat message", (msg) => {
    console.log("Message reçu:", msg);
    // Émettre le message à tous les clients connectés
    io.emit("chat message", msg);
  });

  // Gérer la déconnexion
  socket.on("disconnect", () => {
    console.log("Client déconnecté");
  });
});

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

const socketIo = require("socket.io");

module.exports = function (server) {
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
};

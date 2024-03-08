const { MongoClient } = require("mongodb");

let client = null;

const connect = (url, callback) => {
  if (client !== null && client.isConnected()) {
    callback(client);
  } else {
    client = new MongoClient(url);
    client.connect((err) => {
      if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        callback(null);
      } else {
        console.log("Connexion réussie à la base de données");
        callback(client);
      }
    });
  }
};

const close = () => {
  if (client !== null && client.isConnected()) {
    console.log("Fermeture de la connexion à la base de données");
    client.close();
    client = null;
  }
};

module.exports = { connect, close };

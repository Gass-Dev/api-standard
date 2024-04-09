// const redis = require("redis");
// const client = redis.createClient();

// // Connectez-vous au client Redis
// client.on("connect", () => {
//   console.log("Connecté au serveur Redis");
// });

// // Gestion des erreurs de connexion au client Redis
// client.on("error", (err) => {
//   console.error("Erreur de connexion au serveur Redis :", err);
// });

// // Middleware pour mettre en cache les réponses
// const cacheMiddleware = (req, res, next) => {
//   const cacheKey = req.originalUrl;

//   // Vérifier si la réponse est déjà en cache
//   client.get(cacheKey, (err, cachedData) => {
//     if (err) {
//       console.error(
//         "Erreur lors de la récupération des données en cache:",
//         err
//       );
//       return next();
//     }

//     if (cachedData) {
//       // Si les données sont en cache, les renvoyer directement
//       const data = JSON.parse(cachedData);
//       console.log("Données récupérées depuis le cache");
//       return res.json(data);
//     } else {
//       // Si les données ne sont pas en cache, continuer le flux de la requête
//       return next();
//     }
//   });
// };

// module.exports = cacheMiddleware;

// Importation des modules nécessaires
const express = require('express');
const router = require('./router');


// Initialisation du serveur express
const app = express();

// Paramètrage du serveur express pour qu'il puisse lire du JSON
app.use(express.json());

// Utilisation de la route principale
app.use('/api', router);

// Initialisation du port du serveur
const PORT = 8080;


// Écoute du port par le serveur express
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})

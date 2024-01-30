// Importation des modules (version oneline et normale)
// const express = require('express');
// const router = express.Router();

const router = require('express').Router();
const RegisterController = require('./register.controller');

// Création d'une route POST -> On va indiquer le controller qui va intéragir avec la route
// OU on y écrit simplement le processus que la route doit effectuer
router.post('/register', RegisterController.register);

module.exports = router;



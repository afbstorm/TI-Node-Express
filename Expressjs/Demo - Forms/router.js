const router = require('express').Router();

// Affichage du formulaire
router.get('/', (req, res) => {
    res.render('form')
});

// Récupération des données du formulaire
router.post('/submit-form', (req, res) => {
    const { name, email } = req.body;
    res.send(`Name: ${name} and email: ${email}`)
});

module.exports = router;

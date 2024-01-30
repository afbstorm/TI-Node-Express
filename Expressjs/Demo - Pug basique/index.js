// Importation des modules
const express = require('express');
const path = require('path');
const products = require('./datas/products.json');

const PORT = 8000;

// Initialisation du serveur
const app = express();

// Instruction a express d'utiliser le moteur de templating pug
app.set('view engine', 'pug');
// Instruction a express de quel dossier utiliser pour chercher les vues
app.set('views', path.join(__dirname+'/views'));
app.use(express.static(path.join(__dirname+'/public')));


app.get('/', (req, res) => {
    res.render('main', {products})
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
});

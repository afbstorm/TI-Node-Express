// Importation des modules requis
const http = require('http');
const ejs = require('ejs');
const fs = require('fs');

// Définition du PORT que le serveur va écouter
const PORT = 8080;

// Création - initialisation du serveur HTTP
const server = http.createServer();

// Écoute du serveur sur le port pré-établi
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

// Initialisation de la constante qui va contenir notre fichier de templating
const body = fs.readFileSync(__dirname+'/Views/index.ejs', 'utf-8')

// Initilisation du rendering de notre fichier (injection des valeurs)
const bodyRender = ejs.render(body, {promotion: 'Web AI de Technifutur'});

// Création de la vue Server Side Rendering
const SsrBody = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(bodyRender)
};

// Envoi la vue au serveur
server.on('request', SsrBody);

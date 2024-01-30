const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const PORT = 8080;

const server = http.createServer((req, res) => {

    const url = req.url;

    const indexBody = fs.readFileSync(__dirname+'/views/index.ejs', 'utf-8');
    const carreBody = fs.readFileSync(__dirname+'/views/carre.ejs', 'utf-8');

    const age = 92;
    const firstname = 'Maldiomaryn';
    const lastname = 'Sang-de-Braise';
    const description = 'Haut-elfe érudit, plus spécifiquement Sorcier de ' +
        'troisième échelon de domaine du Feu. Il accompagne Bjorn et Lazzo dans leur lutte' +
        'contre les Dieux Sombres du Chaos.'

    if (url === '/') {
        const render = ejs.render(indexBody, {firstname, lastname, description, age});
        res.end(render);
    } else if (url === '/carre') {
        const render = ejs.render(carreBody);
        res.end(render);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
});

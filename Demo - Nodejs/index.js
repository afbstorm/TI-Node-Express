// Importation module HTTP
const http = require('http');

// Déclaration du port écouté par la serveur
const PORT = 8080;

// Déclaration et initialisation du serveur
const server = http.createServer((req, res) => {

    // Déclaration constante de récupération d'infos sur le routing (url)
    const url = req.url.toLocaleLowerCase();
    const method = req.method;

    const productRegex = /(?<=^\/product\/)[0-9]+$/;

    // Déclarer conditionnellement l'affichage
    if (method === 'GET' && url === '/') {
        const body = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Demo</title>$
            </head>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>`;

        res.end(body);
    }
    else if (method === 'GET' && productRegex.test(url)) {
        const productId = productRegex.exec(url);
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Demo</title>
            </head>
            <body>
                <h1>ID récupéré depuis l'url : ${productId}</h1>
            </body>
        </html>
        `)
    }
    else {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Demo</title>
            </head>
            <body>
                <h1>Error 404 : Page not found</h1>
            </body>
        </html>\`;
        `)
    }
})

// Écoute du serveur sur le port pré-établi
server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
});

const express = require('express');
const cookieParser = require('cookie-parser');
const UserRouter = require('./router/user.router');
const path = require('path');
const app = express();
const port = 8003;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(UserRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
});

// BONUS 1 : Créer une méthode getById
// BONUS 2 : Créer un form via pug ou ejs et permettre une connexion utilisateur (login)
// BONUS 3 : Créer en pug ou ejs une liste avec tous les utilisateurs une fois connecté
// BONUS 4 : Créer en pug ou ejs une page détails utilisateur en cliquant sur son nom dans la liste
// BONUS 5 : Créer une page d'enregistrement
// BONUS 6 : Adapter la fonction de login pour inclure une vérification de token - si expiré mettre à jour
// BONUSLAURENT : Refait formulaire en atomic design - Atom (texte), molecules (input réutilisable), organism (formulaire)

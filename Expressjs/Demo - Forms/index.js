const express = require('express');
const router = require('./router');

const PORT = 8001;
const app = express();

// On va signaler a express qu'il va devoir lire un formulaire (un format complexe)
app.use(express.urlencoded({extended: true}));
app.use(router);

// Initialisation du view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})

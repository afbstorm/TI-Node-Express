const express = require('express');
const path = require('path');
const router = require("./router");

const app = express();
const PORT = 8080;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname+'/views'));
app.use(express.static(path.join(__dirname+'/public')));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
});

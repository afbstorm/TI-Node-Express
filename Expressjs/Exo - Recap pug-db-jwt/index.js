const express = require('express');
const path = require('path');
const UserRouter = require('./router/users.router');

const PORT = 8001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(UserRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})

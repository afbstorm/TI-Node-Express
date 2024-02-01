const express = require('express');
const queries = require('./database');

const app = express();
const PORT = 8001;

app.use(express.json());

app.get('/', queries.getAll);
app.get('/:id');
app.post('/', queries.addUser);
app.patch('/:id');
app.delete('/:id');

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})

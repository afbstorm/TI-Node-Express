const express = require('express');
const userRouter = require('./router');


const PORT = 8080;

const app = express();
app.use(express.json());

app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
});

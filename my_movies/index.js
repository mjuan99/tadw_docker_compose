const express = require('express');
const app = express();
const PORT = 3004;

app.get('/', (req, res) => {
    res.send({
        microservice: 'my_movies'
    });
});

app.listen(PORT, () => {
    console.log("microservice my_movies listening on port " + PORT);
});
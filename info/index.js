const express = require('express');
const app = express();
const PORT = 3003;

app.get('/', (req, res) => {
    res.send({
        microservice: 'info'
    });
});

app.listen(PORT, () => {
    console.log("microservice info listening on port " + PORT);
});
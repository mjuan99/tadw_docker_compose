const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.get('/', async (req, res) => {
    let random_status;
    try {
        const random_response = await axios.get("http://random:3002/");
        if (!random_response.statusText == "OK") {
          throw new Error(`HTTP error! Status: ${random_response.status}`);
        }
        random_status = random_response.data;
    } catch (error) {
        console.log(error);
        random_status = "Error";
    }

    res.send({
        microservice: 'movies',
        dependencies: {
            'random': random_status
        }
    });
});

app.listen(PORT, () => {
    console.log("microservice movies listening on port " + PORT);
});
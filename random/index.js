const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3002;

app.get('/', async (req, res) => {
    let info_status;
    try {
        const info_response = await axios.get("http://info:3003/");
        if (!info_response.statusText == "OK") {
          throw new Error(`HTTP error! Status: ${info_response.status}`);
        }
        info_status = info_response.data;
    } catch (error) {
        console.log(error);
        info_status = "Error";
    }

    let my_movies_status;
    try {
        const my_movies_response = await axios.get("http://my_movies:3004/");
        if (!my_movies_response.statusText == "OK") {
          throw new Error(`HTTP error! Status: ${my_movies_response.status}`);
        }
        my_movies_status = my_movies_response.data;
    } catch (error) {
        console.log(error);
        my_movies_status = "Error";
    }

    res.send({
        microservice: 'random',
        dependencies: {
            'info': info_status,
            'my_movies': my_movies_status
        }
    });
});

app.listen(PORT, () => {
    console.log("microservice random listening on port " + PORT);
});
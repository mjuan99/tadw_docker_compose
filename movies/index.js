const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('movies:3001/styles'));


app.get('/', async (req, res) => {
    
    let random_movies;
    try {
        const random_response = await axios.get("http://random:3002/randommoviesinfo");
        if (!random_response.statusText == "OK") {
          throw new Error(`HTTP error! Status: ${random_response.status}`);
        }
        random_movies = random_response.data;
    } catch (error) {
        console.log(error);
        random_status = "Error";
    }

    res.render('index', {
        microservice: 'movies',
        dependencies: {
            'random': random_movies
        }
    });

});

app.listen(PORT, () => {
    console.log("microservice movies listening on port " + PORT);
});
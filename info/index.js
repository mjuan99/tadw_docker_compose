const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3003;
const apiKey = "031f74795b2d7f3e084d3e7569da2bc9";

app.get('/moviesinfo', async (req, res) => {
     try {
         // Realiza una solicitud a la API de TMDB para obtener una lista de películas populares
         const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
             params: {
                 api_key: apiKey,
                 language: 'es',
                 page: 1
             }
         });

         const data = response.data;

         // Verifica si hay resultados de películas
         if (!data.results || data.results.length === 0) {
             return res.status(404).json({ message: 'No se encontraron películas' });
         }
         // Devuelve la lista de películas obtenidas
         res.json({ movies: data.results });
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 });

 app.get('/movieinfo/:id', async (req, res) => {
    try {
        const movieId = req.params.id; // Obtener el ID de la película desde los parámetros de la URL
        //const movieId = '1075794'; // Id de prueba

        // Realiza una solicitud a la API de TMDB para obtener la información de una película específica por su ID
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: apiKey,
                language: 'es'
            }
        });

        const movieData = response.data;

        // Verifica si se encontró la película
        if (!movieData || movieData.status_code === 34) {
            return res.status(404).json({ message: 'No se encontró la película especificada' });
        }

        // Devuelve la información de la película
        res.json({ movie: movieData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/search', async (req, res) => {
         try {
             const movieName = req.query.name; // Obtener el nombre de la película desde los parámetros de la URL
             //const movieName = "Leo"; // Obtener el nombre de la película desde los parámetros de la URL

             if (!movieName) {
                 return res.status(400).json({ error: 'Debes proporcionar el nombre de la película en la URL' });
             }

             // Realiza una solicitud a la API de TMDB para buscar películas por nombre usando Axios
             const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                 params: {
                     api_key: apiKey,
                     language: 'es',
                     query: movieName,
                     page: 1
                 }
             });

             const data = response.data;

             if (data.results.length === 0) {
                 return res.status(404).json({ message: 'No se encontraron resultados para la película especificada' });
             }

             // Devuelve la información de la primera película encontrada con el nombre especificado
             res.json({
                 movie: data.results[0] // Devuelve los datos de la primera película encontrada
             });
         } catch (error) {
             res.status(500).json({ error: error.message });
         }
     });

     app.get('/', (req, res) => {
     res.send({
         microservice: 'info',
     });
 });

app.listen(PORT, () => {
    console.log("microservice info listening on port " + PORT);
});
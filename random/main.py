from fastapi import FastAPI, HTTPException
import requests
import random

app = FastAPI()

def check_service_status(url):
    try:
        response = requests.get(url)
        return response.status_code == 200
    except Exception as e:
        return False

@app.get("/randommoviesinfo")
def get_random_movies_info():
    try:
        # Verificar el estado de los microservicios
        info_status = check_service_status("http://info:3003/moviesinfo")
        my_movies_status = check_service_status("http://my_movies:3004/randommoviesids")

        # Obtener IDs aleatorios de MyMovies
        mymovies_response = requests.get("http://my_movies:3004/randommoviesids")
        mymovies_data = mymovies_response.json()
        movie_ids = mymovies_data.get("ids", [])

        # Tomar 5 IDs aleatorios (o menos si hay menos de 5)
        random_movie_ids = random.sample(movie_ids, min(len(movie_ids), 5))

        # Obtener detalles de cada película usando el servicio Info
        movies_info = []
        for movie_id in random_movie_ids:
            info_response = requests.get(f"http://info:3003/movieinfo/{movie_id}")
            if info_response.status_code == 200:
                movie_info = info_response.json()
                movies_info.append(movie_info)

        # Construir la respuesta con información sobre el estado de los microservicios
        return {
            "microservice": "random",
            "dependencies": {
                "info": info_status,
                "my_movies": my_movies_status
            },
            "movies_info": movies_info
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener información de las películas: {str(e)}")

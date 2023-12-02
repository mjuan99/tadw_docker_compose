FROM mongo:4.2.0

COPY init-script.js /docker-entrypoint-initdb.d/

ENV MONGO_INITDB_DATABASE=my_movies

EXPOSE 27017
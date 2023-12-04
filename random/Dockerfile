# Usa la imagen base oficial de Python
FROM python:3.9

# Establece el directorio de trabajo en /app
WORKDIR /

# Copia el código de la aplicación al contenedor
COPY main.py .

# Instala las dependencias necesarias
RUN pip install fastapi uvicorn requests

# Expone el puerto en el que se ejecutará el servidor FastAPI
EXPOSE 3002

# Comando para iniciar el servidor FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3002"]


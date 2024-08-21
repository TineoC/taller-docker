# Build Docker Image

```docker
docker build -t taller-docker-mi-nombre .
```

# Run Docker Image

```docker
docker run -d -p 3000:3000 -e NAME=<your_name> taller-docker-mi-nombre
```

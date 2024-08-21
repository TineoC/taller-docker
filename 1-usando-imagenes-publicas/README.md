# Usando imágenes publicas

### Desplegando una pagina web de nginx

https://hub.docker.com/_/nginx/tags

Descargar imagen de nginx en tu pc (opcional)

```
$ docker pull nginx
```

Elegir un tag correspondiente (si no colocas un tag, por default sera latest)

```
$ docker run nginx:alpine
```

### Por qué no podemos acceder a él?

Por default docker corre en su propia red aislada de la maquina Host por lo cual nuestra red y la de docker son procesos aislados en nuestro sistema operativo.

### Cuál es la solución?

Si queremos acceder a nuestras aplicaciones desde nuestra red, podemos asignar un puerto de nuestra maquina al docker host y docker se encargará de enlazar ambos puertos.

```$
$ docker run -p 8080:80 nginx:alpine
```

Donde 8080 es el puerto de nuestra pc y 80 el puerto del contenedor de nginx.

**Aqui estamos usando una red de tipo Host**

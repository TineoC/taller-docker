# Getting Started

```
$ docker init
```

El Cli de Docker hará una serie de preguntas hacerca de nuestro proyecto donde responderemos con:

1. El lenguaje de nuestro proyecto (Node)
2. La versión del lenguaje a utilizar (21.0.0)
3. El manejador de paquetes (npm)
4. Comando para iniciar nuestra aplicación (npm start)
5. Puerto en el que escucha nuestra aplicación (3000)

```
$ docker build -t taller-docker-mi-nombre .
```

Corremos docker build para crear la imágen con el tag "taller-docker-mi-nombre:latest" en docker host local.

```
$ docker run -d -p 3000:3000 taller-docker-mi-nombre
```

Corremos docker run para crear un contenedor con la imagen recién creada

```
$ curl localhost:3000/myname
Hello, my name is: Unknown%
```

```
$ docker run -d -p 3000:3000 -e NAME=chris taller-docker-mi-nombre
$ curl localhost:3000/myname
Hello, my name is: chris%
```

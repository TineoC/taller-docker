# Comandos

### Por el momento, tenemos que mantener la terminal abierta

```
$ docker run -p 8080:80 -d nginx:alpine
```

El argumento **-d nos permite correr el contenedor de manera detached.**

### Ver los contenedores en nuestro host

```
# Ver contenedores en ejecucion
$ docker ps

# Ver todos los contenedores
$ docker ps -a
```

### Administrar un contenedor

```
# Detener un contenedor
$ docker stop <container id>

# Iniciar un contenedor
$ docker start <container id>

# Reiniciar un contenedor
$ docker restart <container id>

# Eliminar un contenedor
$ docker rm <container id>
```

### Debuggear un contenedor - *importante*

```
# Correr comandos en un contenedor
$ docker exec -it <container id> <command>

# Revisar logs de un contenedor
$ docker logs <container id>
```

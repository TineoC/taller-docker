# Creando mi propio Dockerfile

Un archivo Dockerfile es un manifiesto el cual utilizará el Docker Engine en tu host para saber contenerizar tu aplicación/microservicio. **Este proceso debe ser repetible y idealmente debe utilizar la menor cantidad de recursos posible\*.**

A la hora de crear tu primer Dockerfile, primero debes tomar en cuenta cuales son las palabras clave son:

### 1. `FROM`

- **Descripción** : Esta instrucción establece la imagen base que se usará para construir tu imagen de Docker. Es el primer paso en un `Dockerfile` y define el entorno base sobre el cual se añadirán las siguientes capas. Puedes usar imágenes base oficiales como `alpine`, `ubuntu`, `node`, etc.
- **Ejemplo** :

```
FROM node:14-alpine
```

### 2. `LABEL`

- **Descripción** : Se usa para añadir metadatos a la imagen, como el autor, la versión, o cualquier otra información útil para identificar la imagen o su propósito.
- **Ejemplo:**

```
LABEL TEAM=frontend
```

### 3. `RUN`

- **Descripción** : Ejecuta comandos en el contenedor durante la construcción de la imagen. Generalmente se usa para instalar dependencias, ejecutar scripts, o configurar el entorno.
- **Ejemplo** :

```
RUN apt-get update && apt-get install -y curl
```

### 4. `COPY` y `ADD`

- **Descripción** : Ambas instrucciones copian archivos o directorios desde tu máquina host al sistema de archivos del contenedor. `COPY` es más simple y se usa para copiar archivos directamente, mientras que `ADD` tiene funcionalidades adicionales, como descomprimir archivos y descargar contenido desde URLs.
- **Ejemplo** :

```
COPY . ./usr/src/app/

ADD https://example.com/file.tar.gz /usr/src/app/
```

### 5. `WORKDIR`

- **Descripción** : Define el directorio de trabajo dentro del contenedor. Cualquier instrucción `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, o `ADD` que aparezca después de esta instrucción será ejecutada desde este directorio.
- **Ejemplo** :

```
WORKDIR /usr/src/app
```

### 6. `EXPOSE`

- **Descripción** : Informa a Docker que el contenedor escuchará en un puerto específico en tiempo de ejecución. Esto es útil para aplicaciones que necesitan exponer un puerto hacia el exterior.
- **Aclaración: EXPOSE funciona de manera de documentación de en qué puerto escucha la aplicación pero por si solo no es capaz de exponer un puerto en la máquina Host.**
- **Ejemplo** :

```
EXPOSE 80
```

### 7. `CMD`

- **Descripción** : Define el comando por defecto que se ejecutará cuando el contenedor se inicie. `CMD` se puede sobrescribir si se proporcionan otros comandos al ejecutar el contenedor.
- **Ejemplo** :

```
CMD [ "node", "app.js" ]
```

### 8. `ENTRYPOINT`

- **Descripción** : Similar a `CMD`, pero con la diferencia de que siempre se ejecutará cuando se inicie el contenedor y no puede ser sobrescrito completamente. Es útil para definir un comportamiento fijo en el contenedor.
- **Ejemplo** :

```
ENTRYPOINT [ "npm", "start" ]
```

### 9. `ENV`

- **Descripción** : Establece variables de entorno dentro del contenedor. Estas variables pueden ser usadas en comandos subsiguientes o por la aplicación que se ejecuta en el contenedor.
- **Ejemplo** :

```
ENV DATABASE_USER=chris
```

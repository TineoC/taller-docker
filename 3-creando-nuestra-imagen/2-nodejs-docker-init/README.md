# á Como mejorar este projecto?

Aunque nuestro primer ejemplo no está mal, tiene muchas oportunidades de mejora en términos de un proyecto de la vida real.

- Podemos incluir reglas más nuestro .dockerignore
- Podemos cachear los paquetes de nuestro package.json

Hacer esto es una tarea ardua cuando no tenemos un conocimiento amplio de Docker y el comando docker init nos permite darnos un template para empezar a incluirlo en nuestros proyectos ya existentes.

# Getting Started

```
$ docker init
Welcome to the Docker Init CLI!

This utility will walk you through creating the following files with sensible defaults for your project:
  - .dockerignore
  - Dockerfile
  - compose.yaml
  - README.Docker.md

Let's get started!

? What application platform does your project use?  [Use arrows to move, type to filter]
> Node - (detected) suitable for a Node server application
  Go - suitable for a Go server application
  Python - suitable for a Python server application
  Rust - suitable for a Rust server application
  ASP.NET Core - suitable for an ASP.NET Core application
  PHP with Apache - suitable for a PHP web application
  Java - suitable for a Java application that uses Maven and packages as an uber jar
  Other - general purpose starting point for containerizing your application
  Don't see something you need? Let us know!
  Quit
```

Docker ha detectado que nuestro proyecto es de nodejs y nos preparará unos templates con las mejores prácticas de estos archivos acorde a este tipo de proyectos.

```
$ docker build -t taller-docker-mi-nombre:v2 .
$ docker run -p 3001:3001 -e NAME=chris -e PORT=3001 taller-docker-mi-nombre:v2
$ curl http://localhost:3001/myname
```

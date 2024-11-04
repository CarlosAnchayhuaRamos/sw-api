<!--
title: 'AWS Serverless REST API with DynamoDB and offline support example in NodeJS'
description: 'This example demonstrates how to build a service locally, using the ''serverless-offline'' plugin. It provides a REST API to manage Todos stored in DynamoDB. We used this for build an app for RIMAC'
layout: Doc
framework: serverless
platform: AWS
language: nodeJS
authorName: 'Carlos Anchayhua'
-->

## Use-case

Translate and save information about Star Wars.

## Setup

```bash
npm install
serverless dynamodb install (or to use a persistent docker dynamodb instead, open a new terminal: cd ./dynamodb && docker-compose up -d)
serverless offline start
serverless dynamodb migrate  (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

## Usage

You can create, retrieve or delete todos with the following commands:

### Create a Todo

```bash
http://localhost:3000/todos/{id}
```

Example Result:
```bash
{
    "id": "a81be77d-fb2a-4779-9c72-677515e5f062",
    "nombre": "Biggs Darklighter",
    "altura": "183",
    "masa": "84",
    "color_de_cabello": "black",
    "color_de_piel": "light",
    "color_de_ojos": "brown",
    "anio_de_nacimiento": "24BBY",
    "genero": "male",
    "planeta_natal": "https://swapi.py4e.com/api/planets/1/",
    "peliculas": [
        "https://swapi.py4e.com/api/films/1/"
    ],
    "especies": [
        "https://swapi.py4e.com/api/species/1/"
    ],
    "vehiculos": [],
    "naves_estelares": [
        "https://swapi.py4e.com/api/starships/12/"
    ],
    "creado": "2014-12-10T15:59:50.509000Z",
    "editado": "2014-12-20T21:17:50.323000Z",
    "url": "https://swapi.py4e.com/api/people/9/",
    "RegistroCreado": "2024-11-04T06:54:50.465Z",
    "RegistroActualizado": "2024-11-04T06:54:50.465Z"
}%
```

### List all Todos

```bash
http://localhost:3000/todos
```

Example output:
```bash
[{
    "id": "a81be77d-fb2a-4779-9c72-677515e5f062",
    "nombre": "Biggs Darklighter",
    "altura": "183",
    "masa": "84",
    "color_de_cabello": "black",
    "color_de_piel": "light",
    "color_de_ojos": "brown",
    "anio_de_nacimiento": "24BBY",
    "genero": "male",
    "planeta_natal": "https://swapi.py4e.com/api/planets/1/",
    "peliculas": [
        "https://swapi.py4e.com/api/films/1/"
    ],
    "especies": [
        "https://swapi.py4e.com/api/species/1/"
    ],
    "vehiculos": [],
    "naves_estelares": [
        "https://swapi.py4e.com/api/starships/12/"
    ],
    "creado": "2014-12-10T15:59:50.509000Z",
    "editado": "2014-12-20T21:17:50.323000Z",
    "url": "https://swapi.py4e.com/api/people/9/",
    "RegistroCreado": "2024-11-04T06:54:50.465Z",
    "RegistroActualizado": "2024-11-04T06:54:50.465Z"
}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
http://localhost:3000/todos/<id>
```

Example Result:
```bash
{
    "planeta_natal": "https://swapi.py4e.com/api/planets/1/",
    "naves_estelares": [],
    "color_de_piel": "light",
    "color_de_cabello": "brown",
    "peliculas": [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/5/",
        "https://swapi.py4e.com/api/films/6/"
    ],
    "color_de_ojos": "blue",
    "especies": [
        "https://swapi.py4e.com/api/species/1/"
    ],
    "anio_de_nacimiento": "47BBY",
    "nombre": "Beru Whitesun lars",
    "vehiculos": [],
    "url": "https://swapi.py4e.com/api/people/7/",
    "RegistroCreado": 1730702786666,
    "masa": "75",
    "creado": "2014-12-10T15:53:41.121000Z",
    "RegistroActualizado": 1730702786666,
    "altura": "165",
    "editado": "2014-12-20T21:17:50.319000Z",
    "genero": "female",
    "id": "846613d0-9a78-11ef-8486-af1b375c6117"
}%
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
http://localhost:3000/todos/<id>
```

No output
or
{}

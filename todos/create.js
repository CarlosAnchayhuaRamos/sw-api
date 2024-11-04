'use strict';

const { v4: uuidv4 } = require('uuid');
const dynamodb = require('./dynamodb');

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crea un nuevo recurso.
 *     description: Este endpoint permite crear un nuevo recurso en la base de datos.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Recurso a crear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             altura:
 *               type: string
 *     responses:
 *       200:
 *         description: Recurso creado exitosamente.
 *       500:
 *         description: Error en la creación del recurso.
 */
module.exports.create = async (event) => {
  const fetch = await import('node-fetch').then(mod => mod.default);

  const code = event.pathParameters.id;
  console.log("code:", code);

  const url = `https://swapi.py4e.com/api/people/${code}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    const people = await response.json();

    const timestamp = new Date().toISOString();

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuidv4(),
        nombre: people.name,
        altura: people.height,
        masa: people.mass,
        color_de_cabello: people.hair_color,
        color_de_piel: people.skin_color,
        color_de_ojos: people.eye_color,
        anio_de_nacimiento: people.birth_year,
        genero: people.gender,
        planeta_natal: people.homeworld,
        peliculas: people.films,
        especies: people.species,
        vehiculos: people.vehicles,
        naves_estelares: people.starships,
        creado: people.created,
        editado: people.edited,
        url: people.url,
        RegistroCreado: timestamp,
        RegistroActualizado: timestamp,
      },
    };

    await dynamodb.put(params).promise();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the item.',
    };
  }
};
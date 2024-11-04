import { create } from './../todos/create.js'; // Ajusta la ruta según sea necesario
import AWSMock from 'aws-sdk-mock';
import fetch, { Response } from 'node-fetch';

jest.mock('node-fetch');

describe('create function', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(require('aws-sdk'));
    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, {});
    });
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should create an item in DynamoDB', async () => {
    const event = {
      pathParameters: {
        id: '1',
      },
    };

    const fakeResponse = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.py4e.com/api/planets/1/',
      films: ['https://swapi.py4e.com/api/films/1/'],
      species: ['https://swapi.py4e.com/api/species/1/'],
      vehicles: ['https://swapi.py4e.com/api/vehicles/14/'],
      starships: ['https://swapi.py4e.com/api/starships/12/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.py4e.com/api/people/1/',
    };

    fetch.mockImplementation(() => Promise.resolve(new Response(JSON.stringify(fakeResponse))));

    const result = await create(event);

    console.log(result);
    

    expect(result).toEqual(expect.objectContaining({
      statusCode: 200,
      body: JSON.stringify(expect.objectContaining({
        nombre: fakeResponse.name,
        altura: fakeResponse.height,
      })),
    }));
  });
});
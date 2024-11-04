import { get } from './../todos/get.js'; // Ajusta la ruta según sea necesario
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

jest.mock('aws-sdk');

describe('get function', () => {
  beforeEach(() => {
    // Configura AWS Mock para simular el DocumentClient de DynamoDB
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    // Limpia las simulaciones de AWS después de cada prueba
    AWSMock.restore();
    jest.resetAllMocks(); // Restablece todas las simulaciones de Jest
  });

  it('should fetch a todo item from DynamoDB', (done) => {
    const event = {
      pathParameters: {
        id: '1', // ID de ejemplo para buscar
      },
    };

    // Simula una respuesta exitosa de DynamoDB
    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, {
        Item: {
          id: '1',
          name: 'Test Item',
          completed: false,
        },
      });
    });

    const context = {};

    // Llama a la función get
    get(event, context, (error, response) => {
      expect(error).toBeNull();
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({
          id: '1',
          name: 'Test Item',
          completed: false,
        }),
      });
      done();
    });
  });

  it('should handle errors when fetching from DynamoDB', (done) => {
    const event = {
      pathParameters: {
        id: '1',
      },
    };

    // Simula un error al intentar obtener un ítem de DynamoDB
    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback({ statusCode: 404, message: 'Item not found' }, null);
    });

    const context = {};

    // Llama a la función get
    get(event, context, (error, response) => {
      expect(error).toBeNull();
      expect(response).toEqual({
        statusCode: 404,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't fetch the todo item.",
      });
      done();
    });
  });
});
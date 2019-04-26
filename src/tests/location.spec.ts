import server from '../app';
import cases from 'jest-in-case';
import request from 'supertest';
import {
  locationPayload, wrongLocationPayload, updateLocationPayload
} from './data/locationPayload';

afterAll(async () => {
  await server.close();
});

let id: number;

const testCreateLocationCases = [
  {
    name: 'should create a location with the right payload',
    payload: locationPayload,
    result: {
      statusCode: 201,
      body: {
        message: 'New location created',
        location: 'lagos'
      }
    }
  },
  {
    name: 'should return 400 with incorrect payload',
    payload: wrongLocationPayload,
    result: {
      statusCode: 400,
      body: {
        errors: [
          'Female is required',
          'Female value should be numeric'
        ]
      }
    }
  }
];

const testGetLocations = [
  {
    name: 'get a location by id',
    result: {
      statusCode: 200,
      body: {
        location: 'lagos',
      }
    }
  }
];

const testUpdateLocationsFails = [
  {
    name: 'update a location by id returns 400',
    payload: updateLocationPayload,
    result: {
      statusCode: 400,
      errors: [
        'Location ID is not a valid MongoID'
      ]
    }
  },
];

const testUpdateLocations = [
  {
    name: 'update a location by id',
    payload: updateLocationPayload,
    result: {
      statusCode: 200,
      body: {
        updatedLocation: {
          male: 22,
          female: 24,
          totalPopulation: 46,
        }
      }
    }
  }
];

const testDeleteLocations = [
  {
    name: 'get a location by id',
    result: {
      statusCode: 200,
      body: {
        message: 'Location deleted',
      }
    }
  }
];

const testCreateFn = async ({ payload, result }) => {
  const prefix = '/api/';
  const response = await request(server)
    .post(`${prefix}/locations`)
    .send(payload);

  expect(response.status).toEqual(result.statusCode);
  if (response.status === 400) expect(response.body.errors[0]).toEqual(result.body.errors[0]);
  if (response.status === 201) {
    id = response.body.newLocation._id;
    expect(response.body.newLocation.location).toEqual(result.body.location);
  }
};

const testGetFn = async ({ result }) => {
  const prefix = '/api/';
  const response = await request(server)
    .get(`${prefix}/locations`);

  expect(response.status).toEqual(result.statusCode);
  expect(response.body.slice(-1)[0].location).toEqual(result.body.location);
};

const testUpdateFnFails = async ({ payload, result }) => {
  const prefix = '/api/';
  const response = await request(server)
    .put(`${prefix}/locations/${id}s`)
    .send(payload);

  expect(response.status).toEqual(result.statusCode);
  expect(response.body.errors[0]).toEqual(result.errors[0]);
};

const testUpdateFn = async ({ payload, result }) => {
  const prefix = '/api/';
  const response = await request(server)
    .put(`${prefix}/locations/${id}`)
    .send(payload);

  expect(response.status).toEqual(result.statusCode);
  expect(response.body.updatedLocation.totalPopulation).toEqual(result.body.updatedLocation.totalPopulation);
};

const testDeleteFn = async ({ result }) => {
  const prefix = '/api/';
  const response = await request(server)
    .delete(`${prefix}/locations/${id}`)

  expect(response.status).toEqual(result.statusCode);
  expect(response.body.message).toEqual(result.body.message);
};

cases('Create a new location', testCreateFn, testCreateLocationCases);
cases('Get locations', testGetFn, testGetLocations);
cases('Update a location by id fails', testUpdateFnFails, testUpdateLocationsFails);
cases('Update a location by id succeeds', testUpdateFn, testUpdateLocations);
cases('Delete a location by id', testDeleteFn, testDeleteLocations);
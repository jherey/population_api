import server from '../app';
import cases from 'jest-in-case';
import request from 'supertest';

afterAll(async () => {
  await server.close();
});

const testCases = [
  {
    name: 'returns 200',
    result: {
      statusCode: 200,
      body: { message: 'Welcome to Population Management System!' }
    }
  }
];

const testFn = async ({ result }) => {
  const prefix = '/api/';
  const response = await request(server)
    .get(`${prefix}`);

  expect(response.status).toEqual(result.statusCode);
  expect(response.body.message).toEqual(result.body.message);
};

cases('Get the API home route', testFn, testCases);
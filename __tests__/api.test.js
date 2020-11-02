'use strict';

const app= require('../lib/server').server;
const supertest = require('supertest');
const mockRequest = supertest(app);

describe('testing the get request methods', () => {

  it('It should get all products', () => {
    return mockRequest
    .get('/products')
    .then(results => {
      expect(results.status).toBe(200);
    })
  })

  it('It should get a specific product from the id' , () => {
    return mockRequest
    .get('/products/:id')
    .then(results => {
      expect(results.status).toBe(200);
    })
  })

  it('It should get all categories', () => {
    return mockRequest
    .get('/categories')
    .then(results => {
      expect(results.status).toBe(200);
    })
  })

  it('It should get a specific categories record from the id' , () => {
    return mockRequest
    .get('/categories/:id')
    .then(results => {
      expect(results.status).toBe(200);
    })
  })
})


describe('testing error handling', () => {

  it('It should respond with an error for a 404 route', () => {
    return mockRequest
    .get('/fakeRoutetoTest404')
    .then(results => {
      expect(results.status).toBe(404);
    })
  })

})


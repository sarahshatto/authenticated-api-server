'use strict';

// creating a similar environment. Dependencies
const base64 = require('base-64');
const basicAuth = require('../src/auth/middleware//basic.js');
const User = require('../src/auth/models/users-model.js');

// These start the server, specifically MongoDB, needed for testing
const server = require('../src/server.js').app;
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

// Test credentials
const testUserName = 'user';
const testPassword = 'password';

// Make sure we have an entry in the DB
beforeAll(async (done) => {
  await new User({ username: testUserName, password: testPassword }).save();
  done();
});

let res = {};

describe('BasicAuth Tests', () => {
  // Test using an invalid username
  it('BasicAuth - Invalid Username', async () => {
    let encodedString = base64.encode(`fakeUser:fakePassword`);

    let req = {
      headers: {
        authorization: `Basic ${encodedString}`,
      },
    };

    let next = jest.fn();

    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  // Test using an invalid password
  it('BasicAuth - Invalid Password', async () => {
    let encodedString = base64.encode(`${testUserName}:fakePassword`);

    let req = {
      headers: {
        authorization: `Basic ${encodedString}`,
      },
    };

    let next = jest.fn();

    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  // Test using the Test credentials
  it('BasicAuth - Valid Data', async () => {
    let encodedString = base64.encode(`${testUserName}:${testPassword}`);

    let req = {
      headers: {
        authorization: `Basic ${encodedString}`,
      },
    };

    let next = jest.fn();
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});

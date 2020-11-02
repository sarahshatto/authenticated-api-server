'use strict';

const base64 = require('base-64');
const bearerAuth = require('../src/auth/middleware/bearer.js');
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

async function getToken() {
  // Sign up to get a token
  const obj = {
    username: 'username',
    password: 'password',
  };

  const signupMock = await mockRequest.post('/signup').send(obj);
  return signupMock.body.token;
}

let res = {};

describe('BearerAuth Tests', () => {
  // Test using an invalid token
  it('BearerAuth - Invalid Token', async () => {
    let req = {
      headers: {
        authorization: `Bearer fakeToken`,
      },
    };

    let next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid token');
  });

  it('BearerAuth - Valid Token', async () => {
    let token = await getToken();

    // Use the token for bearer auth
    let req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    let next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
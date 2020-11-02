'use strict';

const server = require('../src/server.js').app;
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');
const base64 = require('base-64');

const User = require('../src/auth/models/users-model.js');

// Test credentials
const testUserName = 'user';
const testPassword = 'password';

// Make sure we have an entry in the DB
beforeAll(async (done) => {
  await new User({ username: testUserName, password: testPassword }).save();
  done();
});

describe('Router Tests', () => {
  // Call the signin path with an invalid username
  it('/signin - Invalid Username', async () => {
    let encodedString = base64.encode(`fakeUser:fakePassword`);

    const signinMock = await mockRequest
      .post('/signin')
      .set('authorization', `Basic ${encodedString}`);
    expect(signinMock.text).toEqual('Invalid Login');
  });

  // Call the signin path with an invalid password
  it('/signin - Invalid Password', async () => {
    let encodedString = base64.encode(`${testUserName}:fakePassword`);

    const signinMock = await mockRequest
      .post('/signin')
      .set('authorization', `Basic ${encodedString}`);
    expect(signinMock.text).toEqual('Invalid Login');
  });

  // Call the signin path with valid credentials
  it('/signin - Valid Data', async () => {
    let encodedString = base64.encode(`${testUserName}:${testPassword}`);

    const signinMock = await mockRequest
      .post('/signin')
      .set('authorization', `Basic ${encodedString}`);

    expect(signinMock.status).toBe(200);
  });

  // Call the signup path
  it('/signup - Valid Data', async () => {
    const obj = {
      username: 'username',
      password: 'password',
    };
    const signupMock = await mockRequest.post('/signup').send(obj);
    expect(signupMock.status).toBe(201);
  });

  it('/secret - Invalid Data', async () => {
    let encodedString = base64.encode(`fakeTokenValue`);

    const secretMock = await mockRequest
      .get('/secret')
      .set('authorization', `Bearer ${encodedString}`);

    expect(secretMock.text).toEqual('Invalid token');
  });

  it('/secret - Valid Token', async () => {
    // Sign in to get the user token
    let encodedString = base64.encode(`${testUserName}:${testPassword}`);

    const signinMock = await mockRequest
      .post('/signin')
      .set('authorization', `Basic ${encodedString}`);

    // Call the secret path with the token
    const secretMock = await mockRequest
      .get('/secret')
      .set('authorization', `Bearer ${signinMock.body.token}`);
    
    expect(secretMock.body.username).toBe(testUserName);
  });
});

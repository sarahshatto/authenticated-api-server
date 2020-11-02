'use strict';

const server = require('../src/server.js').app;
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

async function GetToken(userData) {
  const signupMock = await mockRequest.post('/signup').send(userData);
  expect(signupMock.status).toBe(201);

  return signupMock.body.token;
}

async function GetGuestToken() {
  const GuestData = {
    username: 'guest',
    password: 'password',
    role: 'guest',
  };

  return await GetToken(GuestData);
}

async function GetUserToken() {
  const UserData = {
    username: 'user',
    password: 'password',
    role: 'user',
  };

  return GetToken(UserData);
}

async function GetAdminToken() {
  const AdminData = {
    username: 'admin',
    password: 'password',
    role: 'admin',
  };

  return await GetToken(AdminData);
}

describe('Todo Tests', () => {
  // Call the signup path
  it('/todo - api/v2 checks', async () => {
    // ROUTES TO TEST
    // POST /api/v2/todo
    // GET /api/v2/todo
    // GET /api/v2/todo/:id
    // PUT /api/v2/todo/:id
    // DELETE /api/v2/todo/:id
    let adminToken = await GetAdminToken();

    let newTodo = {
      name: 'Todo 1',
      id: '123',
    };

    // Post a new todo
    let postTodoMock = await mockRequest
      .post('/api/v2/todo')
      .set('authorization', `bearer ${adminToken}`)
      .send(newTodo);

    expect(postTodoMock.status).toBe(201);

    // Get all of the entries (should be more than one)
    let getAllEntriesMock = await mockRequest
      .get('/api/v2/todo')
      .set('authorization', `bearer ${adminToken}`);

    expect(getAllEntriesMock.status).toBe(201);

    // Get the specific entry
    let getOneEntryMock = await mockRequest
      .get('/api/v2/todo/123')
      .set('authorization', `bearer ${adminToken}`);

    expect(getOneEntryMock.status).toBe(201);

    // Update the entry name
    newTodo.name = 'Todo 2';
    let updateTodoMock = await mockRequest
      .put('/api/v2/todo/123')
      .set('authorization', `bearer ${adminToken}`)
      .send(newTodo);
    expect(updateTodoMock.status).toBe(201);

    // Check to make sure the entry name was updated
    getOneEntryMock = await mockRequest
      .get('/api/v2/todo/123')
      .set('authorization', `bearer ${adminToken}`);

    expect(getOneEntryMock.status).toBe(201);

    // Delete the entry
    console.log('delete entry');
    let deleteEntryMock = await mockRequest
      .delete('/api/v2/todo/123')
      .set('authorization', `bearer ${adminToken}`);

    expect(deleteEntryMock.status).toBe(201);

    // Make sure the entry no longer exists
    getOneEntryMock = await mockRequest
      .get('/api/v2/todo/123')
      .set('authorization', `bearer ${adminToken}`);

    expect(getOneEntryMock.status).toBe(404);
  });
});

const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('password', 10);
  const users = helper.initialUsers.map(
    (user) => new User({ ...user, passwordHash })
  );
  const promiseArray = users.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe('user addition', () => {
  test('succeeds if data is valid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'testUser',
      name: 'testUser',
      password: 'testUser',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('fails if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'initialUser',
      name: 'initialUser',
      password: 'initialUser',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(response.body.error).toContain('expected `username` to be unique');
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails if username is empty', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'testUser',
      password: 'testUser',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(response.body.error).toContain('`username` is required');
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails if password is not provided', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'testUser',
      name: 'testUser',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(response.body.error).toContain('password missing');
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails if username is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ab',
      name: 'testUser',
      password: 'testUser',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(response.body.error).toContain(
      '`username` (`ab`) is shorter than the minimum allowed length'
    );
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails if password is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'testUser',
      name: 'testUser',
      password: 'te',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(response.body.error).toContain(
      'password must be at least 3 characters long'
    );
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

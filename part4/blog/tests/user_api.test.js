const bcrpypt = require('bcrypt');
const helper = require('./test_helper');
const supertest = require('supertest');
const User = require('../models/user');

const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrpypt.hash('password', 10);

  const user = new User({
    username: 'initialUser',
    user: 'initialUser',
    passwordHash,
  });

  await user.save();
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
  });

  test('fails if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'initialUser',
      name: 'initialUser',
      password: 'initialUser',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

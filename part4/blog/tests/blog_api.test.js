const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs').expect(200);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier of a blog is id', async () => {
  const blogs = await helper.blogsInDb();
  expect(blogs[0]['id']).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});

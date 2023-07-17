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

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'David Chan',
    url: 'https://seveltepatterns.com/',
    likes: 12,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const blogsNoId = blogsAtEnd.map((blog) => {
    return {
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
    };
  });
  expect(blogsNoId).toContainEqual(newBlog);
});

afterAll(async () => {
  await mongoose.connection.close();
});

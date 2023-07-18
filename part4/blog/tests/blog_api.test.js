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

describe('when there are initially some notes saved', () => {
  test('all blogs are returned in JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier of a blog is id', async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0]['id']).toBeDefined();
    expect(blogs.at(-1)['id']).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'David Chan',
      title: 'Svelte Patterns',
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
        title: blog.title,
        likes: blog.likes,
        url: blog.url,
      };
    });
    expect(blogsNoId).toContainEqual(newBlog);
  });

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'David Chan',
      url: 'https://seveltepatterns.com/',
      likes: 12,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('blog without url is not added', async () => {
    const newBlog = {
      author: 'David Chan',
      title: 'Svelte Patterns',
      likes: 12,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('the "likes" property default value is 0', async () => {
    const newBlog = {
      author: 'David Chance',
      title: 'Svelte Patterns',
      url: 'https://seveltepatterns.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blogsNoId = blogsAtEnd.map((blog) => {
      return {
        author: blog.author,
        title: blog.title,
        likes: blog.likes,
        url: blog.url,
      };
    });
    expect(blogsNoId).toContainEqual({ ...newBlog, likes: 0 });
  });
});

describe('viewing a specific blog', () => {
  test('succeds if the id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });

  test('fails with code 400 with malformated id', async () => {
    const response = await api.get('/api/blogs/malformated').expect(400);
    expect(response.body).toEqual({ error: 'malformatted id' });
  });

  test('falis with code 404 is id is valid but there is no note with such id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    await api.get(`/api/blogs/${blogToDelete.id}`).expect(404);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const blogsNoId = blogsAtEnd.map((blog) => {
      return {
        author: blog.author,
        title: blog.title,
        likes: blog.likes,
        url: blog.url,
      };
    });
    expect(blogsNoId).not.toContainEqual(blogToDelete);
  });
});

describe('updating a blog', () => {
  test('succeeds if valid number of likes is provided', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedInfo = { ...blogToUpdate, likes: blogToUpdate.likes + 10 };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(200);
  });

  test('fails if negative number of likes is provided', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedInfo = { ...blogToUpdate, likes: -200 };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(400);
  });

  test('fails with 400 if likes value is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const { likes, ...updatedInfo } = blogToUpdate;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

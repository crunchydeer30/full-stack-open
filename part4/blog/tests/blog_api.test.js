const app = require('../app');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('password', 10);

  const firstUser = new User({
    username: 'initialUser',
    passwordHash,
  });
  await firstUser.save();

  const secondUser = new User({
    username: 'secondUser',
    passwordHash,
  });
  await secondUser.save();
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const users = await User.find({});
  const user = users[0];

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user.id })
  );

  const promiseArray = blogObjects.map((blog) => {
    user.blogs = user.blogs.concat(blog._id);
    return blog.save();
  });
  await Promise.all(promiseArray);
  await user.save();
});

const authenticateUser = async (u, pwd) => {
  const authData = {
    username: u,
    password: pwd,
  };
  const authResponse = await api.post('/api/login').send(authData);
  return authResponse.body.token;
};

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
  describe('if user is authenticated', () => {
    let token = '';
    beforeEach(async () => {
      token = await authenticateUser('initialUser', 'password');
    });

    test('succeeds if data is valid', async () => {
      const newBlog = {
        author: 'David Chan',
        title: 'Svelte Patterns',
        url: 'https://seveltepatterns.com/',
        likes: 12,
      };

      const blogsAtStart = await helper.blogsInDb();
      const userAtStart = (await helper.usersInDb())[0];

      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const userAtEnd = (await helper.usersInDb())[0];
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
      expect(userAtEnd.blogs).toHaveLength(userAtStart.blogs.length + 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).toContain(response.body.title);
    });

    test('fails if title is not added', async () => {
      const newBlog = {
        author: 'David Chan',
        url: 'https://seveltepatterns.com/',
        likes: 12,
      };

      const blogsAtStart = await helper.blogsInDb();
      const userAtStart = (await helper.usersInDb())[0];

      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain('`title` is required');

      const blogsAtEnd = await helper.blogsInDb();
      const userAtEnd = (await helper.usersInDb())[0];
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
      expect(userAtEnd.blogs).toHaveLength(userAtStart.blogs.length);
    });

    test('fails if url is not added', async () => {
      const newBlog = {
        author: 'David Chan',
        title: 'Svelte Patterns',
        likes: 12,
      };

      const blogsAtStart = await helper.blogsInDb();
      const userAtStart = (await helper.usersInDb())[0];

      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain('`url` is required');

      const blogsAtEnd = await helper.blogsInDb();
      const userAtEnd = (await helper.usersInDb())[0];
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
      expect(userAtEnd.blogs).toHaveLength(userAtStart.blogs.length);
    });

    test('succeeds if likes value is not added and sets likes to 0', async () => {
      const newBlog = {
        author: 'David Chance',
        title: 'Svelte Patterns',
        url: 'https://seveltepatterns.com/',
      };

      const blogsAtStart = await helper.blogsInDb();
      const userAtStart = (await helper.usersInDb())[0];

      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const userAtEnd = (await helper.usersInDb())[0];
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
      expect(userAtEnd.blogs).toHaveLength(userAtStart.blogs.length + 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).toContain(response.body.title);
    });
  });

  test('if user is not authenticated fails', async () => {
    const newBlog = {
      author: 'David Chan',
      title: 'Svelte Patterns',
      url: 'https://seveltepatterns.com/',
      likes: 12,
    };

    const response = await api.post('/api/blogs').send(newBlog).expect(401);
    expect(response.body.error).toBe('authentication required');
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('viewing a specific blog', () => {
  test('succeds if the id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('fails with code 400 with malformated id', async () => {
    const response = await api.get('/api/blogs/malformated').expect(400);
    expect(response.body).toEqual({ error: 'malformatted id' });
  });

  test('fails with code 404 is id is valid but there is no note with such id', async () => {
    const id = await helper.nonExistingId();
    const response = await api.get(`/api/blogs/${id}`).expect(404);
    expect(response.body.error).toBe('blog does not exist');
  });
});

describe('deletion of a blog', () => {
  describe('if user is authenticated', () => {
    test('succeds if attempted by the user that created the blog', async () => {
      const token = await authenticateUser('initialUser', 'password');
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
      console.log(blogToDelete.id);

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).not.toContain(blogToDelete.title);
    });

    test('fails if attempted by the user that did not create the blog', async () => {
      const token = await authenticateUser('secondUser', 'password');
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      const response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(401);

      expect(response.body.error).toBe(
        'user is not authorized to delete this blog'
      );
    });
  });
});

describe('updating a blog', () => {
  test('succeeds if valid number of likes is provided', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedInfo = { ...blogToUpdate, likes: blogToUpdate.likes + 10 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(200);

    expect(response.body.likes).toBe(blogToUpdate.likes + 10);
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

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(400);

    expect(response.body).toEqual({
      error: 'number of likes is not specified',
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

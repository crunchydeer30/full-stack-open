const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes || 0,
    url: body.url,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) response.json(blog);
  else response.status(404).end();
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  if (!body.likes) {
    return response.status(400).json({
      error: 'number of likes is not specified',
    });
  }

  const blog = {
    author: body.author,
    title: body.title,
    likes: body.likes || 0,
    url: body.url,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;

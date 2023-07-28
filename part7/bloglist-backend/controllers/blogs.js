const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1, date: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user)
    return response.status(401).json({ error: 'authentication required' });

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes || 0,
    url: body.url,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1, date: 1 });
  if (blog) response.json(blog);
  else response.status(404).json({ error: 'blog does not exist' });
});

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) response.json(blog.comments);
  else response.status(404).json({ error: 'blog does not exist' });
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) response.status(404).json({ error: 'blog does not exist' });

  const user = request.user;
  if (!user)
    return response.status(401).json({ error: 'authentication required' });

  const body = request.body;

  const comment = new Comment({
    content: body.content,
    blog: blog.id,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).json({ error: 'blog does not exist' });

  const user = request.user;
  if (blog.user.toString() !== user.id.toString())
    return response
      .status(401)
      .json({ error: 'user is not authorized to delete this blog' });

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
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;

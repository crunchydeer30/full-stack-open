const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  return blogs.slice(0).sort((a, b) => b.likes - a.likes)[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const blogsByAuthor = _.map(_.groupBy(blogs, 'author'), (blogs, author) => {
    return {
      author,
      blogs: blogs.length,
    };
  });

  return _.maxBy(blogsByAuthor, 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const likesByAuthor = _.map(_.groupBy(blogs, 'author'), (blogs, author) => ({
    author: author,
    likes: _.sumBy(blogs, 'likes'),
  }));

  return _.maxBy(likesByAuthor, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

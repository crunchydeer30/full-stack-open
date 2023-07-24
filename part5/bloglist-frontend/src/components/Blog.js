import { useState } from 'react';

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [open, setOpen] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    likeBlog(updatedBlog);
  };

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span className='title'>
          {blog.title}&nbsp;
        </span>
        <span className='author'>
          {blog.author}
        </span>
        <button onClick={() => setOpen(!open)}>{open ? 'Hide' : 'View'}</button>
      </div>
      {open && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div className='likes'>
            <span>Likes: {blog.likes}&nbsp;</span>
            <button onClick={handleLike} className='btn__like'>like</button>
          </div>
          <p>User: {blog.user.username}</p>
          {user.username === blog.user.username && (
            <button onClick={() => removeBlog(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

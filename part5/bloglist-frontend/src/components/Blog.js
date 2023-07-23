import { useState } from 'react';

const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>
          {blog.title} {blog.author}&nbsp;
        </span>
        <button onClick={() => setOpen(!open)}>{open ? 'Hide' : 'View'}</button>
      </div>
      {open && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            <span>Likes: {blog.likes}&nbsp;</span>
            <button>like</button>
          </div>
          <p>Author: {blog.author}</p>
          <p>User: {blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;

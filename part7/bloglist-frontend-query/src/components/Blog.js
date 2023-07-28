import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSetNotification } from '../context/NotificationContext';
import UserContext from '../context/UserContext';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();
  const [open, setOpen] = useState(false);
  const user = useContext(UserContext)[0];

  const likeMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries('blogs');
    },
    onError: (error) => {
      setNotification(error.message, 'error');
    },
  });

  const removeMutation = useMutation(blogService.remove, {
    onSuccess: (removedBlog) => {
      queryClient.invalidateQueries('blogs');
      setNotification(`Remove "${removedBlog.title}"`, 'success');
    },
    onError: (error) => {
      setNotification(error.message, 'error');
    },
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1, user: blog.user.id });
  };

  const handleRemove = () => {
    removeMutation.mutate(blog.id);
  };

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span className='title'>{blog.title}&nbsp;</span>
        <span className='author'>{blog.author}</span>
        <button onClick={() => setOpen(!open)}>{open ? 'Hide' : 'View'}</button>
      </div>
      {open && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div className='likes'>
            <span>Likes: {blog.likes}&nbsp;</span>
            <button onClick={handleLike} className='btn__like'>
              like
            </button>
          </div>
          <p>User: {blog.user.username}</p>
          {user.username === blog.user.username && (
            <button onClick={handleRemove}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

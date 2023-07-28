import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSetNotification } from '../context/NotificationContext';
import blogService from '../services/blogs';

const BlogForm = () => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const blogMutation = useMutation(blogService.create, {
    onSuccess: (blog) => {
      queryClient.invalidateQueries('blogs');
      console.log(blog);
      setNotification(`Blog ${blog.title} has been created`, 'success');
    },
    onError: (error) => {
      setNotification(error.message, 'error');
    },
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !author || !url) return;

    const newBlog = {
      title,
      author,
      url,
    };
    blogMutation.mutate(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
      </div>
      <div>
        <label htmlFor='author'>Author:</label>
        <input
          type='text'
          name='author'
          id='author'
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        ></input>
      </div>
      <div>
        <label htmlFor='url'>URL:</label>
        <input
          type='text'
          name='url'
          id='url'
          placeholder='URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        ></input>
      </div>
      <button id='create-button'>Create</button>
    </form>
  );
};

export default BlogForm;

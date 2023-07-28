import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

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

    try {
      dispatch(createBlog(newBlog));
      dispatch(
        setNotification(`Blog ${newBlog.title} has been created`, 'success', 5)
      );

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5));
    }
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

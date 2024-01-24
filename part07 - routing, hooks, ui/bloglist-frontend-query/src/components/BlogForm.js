import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSetNotification } from '../context/NotificationContext';
import blogService from '../services/blogs';
import { Button, TextField } from '@mui/material';
import Modal from '../components/Modal';

const BlogForm = () => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const modalRef = useRef();

  const blogMutation = useMutation(blogService.create, {
    onSuccess: (blog) => {
      queryClient.invalidateQueries('blogs');
      console.log(blog);
      setNotification(`Blog ${blog.title} has been created`, 'success');
      modalRef.current.toggleShow();
    },
    onError: (error) => {
      setNotification(error.message, 'error');
      modalRef.current.toggleShow();
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
    <Modal title='Create Blog' buttonLabel='Create Blog' ref={modalRef}>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            size='small'
            type='text'
            name='title'
            id='title'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></TextField>
        </div>
        <div>
          <TextField
            size='small'
            type='text'
            name='author'
            id='author'
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          ></TextField>
        </div>
        <div>
          <TextField
            size='small'
            type='text'
            name='url'
            id='url'
            placeholder='URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          ></TextField>
        </div>
        <Button type='submit' variant='contained' id='create-button' sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default BlogForm;

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form } from 'react-bootstrap';
import Modal from './Modal';
import { Button } from 'react-bootstrap';

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const modalRef = useRef();

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
    modalRef.current.toggleShow();
  };

  return (
    <Modal title='Create Blog' buttonLabel='New Blog' ref={modalRef}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            id='title'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='author'>Author:</Form.Label>
          <Form.Control
            type='text'
            name='author'
            id='author'
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='url'>URL:</Form.Label>
          <Form.Control
            type='text'
            name='url'
            id='url'
            placeholder='URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' id='create-button'>Create</Button>
      </Form>
    </Modal>
  );
};

export default BlogForm;

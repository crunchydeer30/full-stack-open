import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { createComment } from '../reducers/blogReducer';
import { Button, Form } from 'react-bootstrap';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createComment({ content: comment }, blog.id));
      dispatch(setNotification('Comment added', 'success'));
    } catch (error) {
      dispatch(setNotification(error.message, 'error'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        placeholder='Enter comment...'
      />
      <Button type='submit' className='my-4'>Submit</Button>
    </Form>
  );
};

export default CommentForm;

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { createComment } from '../reducers/blogReducer';

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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button>Submit</button>
    </form>
  );
};

export default CommentForm;

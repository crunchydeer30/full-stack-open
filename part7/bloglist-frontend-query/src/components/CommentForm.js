import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useSetNotification } from '../context/NotificationContext';

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();
  const [comment, setComment] = useState('');

  const commentMutation = useMutation(
    () => blogService.createComment({ content: comment }, blog.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blog');
        setNotification('Comment created', 'success');
      },
      onError: (error) => {
        setNotification(error.message, 'error');
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    commentMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        placeholder='Enter comment...'
      />
      <button type='submit' className='my-4'>
        Submit
      </button>
    </form>
  );
};

export default CommentForm;

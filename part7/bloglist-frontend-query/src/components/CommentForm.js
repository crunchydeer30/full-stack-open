import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useSetNotification } from '../context/NotificationContext';
import { Button, TextField } from '@mui/material';

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
        setComment('');
      },
      onError: (error) => {
        setNotification(error.response.data.error, 'error');
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    commentMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        size='small'
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        placeholder='Enter comment...'
      />
      <Button type='submit' className='my-4' variant='contained' sx={{ ml: 2 }}>
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;

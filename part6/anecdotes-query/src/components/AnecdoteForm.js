import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import { useSetNotification } from '../NotifcationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.invalidateQueries('anecdotes', anecdotes.concat(newAnecdote));
      setNotification(`Anecdote "${newAnecdote.content}" has been created`, 5);
    },
    onError: (exception) => {
      setNotification(exception.response.data.error, 5);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    newAnecdoteMutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

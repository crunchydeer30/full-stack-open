import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { updateAnecdote } from '../requests';
import { useSetNotification } from '../NotifcationContext';

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const handleVoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newObject) => {
      queryClient.invalidateQueries(
        'anecdotes',
        anecdotes.map((a) => (a.id === newObject.id ? newObject : a))
      );
      setNotification(`You voted for "${newObject.content}"`, 5)
    },
  });

  const handleVote = (anecdote) => {
    handleVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

export default AnecdoteList;

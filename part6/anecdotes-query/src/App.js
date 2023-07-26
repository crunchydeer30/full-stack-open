import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const queryClient = useQueryClient();

  const handleVoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newObject) => {
      queryClient.invalidateQueries(
        'anecdotes',
        anecdotes.map((a) => (a.id === newObject.id ? newObject : a))
      );
    },
  });

  const handleVote = (anecdote) => {
    handleVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  if (result.isError) {
    return (
      <div>Anecdote service is not available due to problems on the server</div>
    );
  }

  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

import { useQuery } from 'react-query';
import { getAnecdotes } from './requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { NotificationContextProvider } from './NotifcationContext';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
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
    <NotificationContextProvider>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </NotificationContextProvider>
  );
};

export default App;

import { useSelector, useDispatch } from 'react-redux';
import { voteAnecode } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecode(id));
  };

  return (
    <div>
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

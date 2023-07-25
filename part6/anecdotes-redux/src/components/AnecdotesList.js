import { useDispatch, useSelector } from 'react-redux';
import { voteAnecode } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.slice(0).sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecode(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => handleVote(anecdote.id)} />
      ))}
    </div>
  );
};

export default AnecdoteList;

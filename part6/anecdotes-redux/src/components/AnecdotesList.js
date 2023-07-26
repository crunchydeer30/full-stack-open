import { useDispatch, useSelector } from 'react-redux';
import { voteAnecode } from '../reducers/anecdoteReducer';
import {
  setNotification,
  hideNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes)
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVote = () => {
    try {
      dispatch(voteAnecode(anecdote));
      dispatch(setNotification(`You voted for "${anecdote.content}"`));
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification(exception));
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }
  };

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

export default AnecdoteList;

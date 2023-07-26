import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';
import {
  setNotification,
  hideNotification,
} from '../reducers/notificationReducer';
import { useState } from 'react';

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('');
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    if (!anecdote) return;
    event.preventDefault();
    try {
      const newAnecdote = await anecdoteService.createNew(anecdote);
      console.log(newAnecdote);
      dispatch(createAnecdote(newAnecdote));
      setAnecdote('');
      dispatch(setNotification(`Created an anecdote: "${anecdote}"`));
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
    <form onSubmit={addAnecdote}>
      <h2>Add anecdote</h2>
      <input
        type='text'
        name='anecdote'
        placeholder='Anecdote...'
        value={anecdote}
        onChange={(e) => setAnecdote(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default AnecdoteForm;

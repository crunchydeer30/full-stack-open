import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useState } from 'react';

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('');
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    if (!anecdote) return;

    event.preventDefault();
    dispatch(createAnecdote(anecdote));
    setAnecdote('');
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

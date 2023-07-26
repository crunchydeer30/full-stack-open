import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}

const anecdoteSlice = createSlice({
  name: 'ancecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecode(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, voteAnecode, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

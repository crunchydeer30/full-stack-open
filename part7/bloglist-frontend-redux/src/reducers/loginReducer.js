import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

export const loginUser = (user) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(user);
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    blogService.setToken(loggedUser.token);
    dispatch(set(loggedUser));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch(set(null));
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(set(user));
  };
};

const loginSlice = createSlice({
  name: 'loggedUsers',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = loginSlice.actions;
export default loginSlice.reducer;

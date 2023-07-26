import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const setNotification = (notification, timer) => {
  return async dispatch => {
    dispatch(changeNotification(notification));
    setTimeout(() => {
      dispatch(changeNotification(null));
    }, (timer * 1000))
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const setNotification = (notification, type, timer = 5) => {
  return async (dispatch) => {
    dispatch(set({ message: notification, type }));
    setTimeout(() => {
      dispatch(set(null));
    }, timer * 1000);
  };
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = notificationSlice.actions;
export default notificationSlice.reducer;

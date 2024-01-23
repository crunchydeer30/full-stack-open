import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    default:
      return state;
  }
};

export const setNotification = (dispatch, notification, timer) => {
  console.log('dispatched');
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: notification,
  });
  setTimeout(() => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: null,
    });
  }, timer * 1000);
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const useSetNotification = (notification, timer) => {
  const dispatch = useContext(NotificationContext)[1];

  return (notification, timer) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: notification,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: null,
      });
    }, timer * 1000);
  };
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

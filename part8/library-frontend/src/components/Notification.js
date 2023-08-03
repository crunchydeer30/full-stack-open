import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const Notification = () => {
  const message = useContext(NotificationContext)[0];
  if (!message) return;

  return <div style={{color: 'red'}}>{message}</div>;
};

export default Notification;

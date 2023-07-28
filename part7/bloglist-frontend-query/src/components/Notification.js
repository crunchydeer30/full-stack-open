import NotificationContext from '../context/NotificationContext';
import { useContext } from 'react';

const Notification = () => {
  const notification = useContext(NotificationContext)[0];
  console.log(notification);

  if (!notification) return;

  return (
    <div
      className={
        notification.type === 'error'
          ? 'notification error'
          : 'notification success'
      }
    >
      {notification.message}
    </div>
  );
};

export default Notification;

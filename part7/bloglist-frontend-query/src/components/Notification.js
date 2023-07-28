import NotificationContext from '../NotificationContext';
import { useContext } from 'react';

const Notification = () => {
  const notification = useContext(NotificationContext)[0];

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

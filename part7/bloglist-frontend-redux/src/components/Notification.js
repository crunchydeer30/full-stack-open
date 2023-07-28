import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
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

const Notification = ({ notification }) => {
  if (!notification) return;
  return <article style={{ color: 'darkGray' }}>{notification}</article>;
};

export default Notification;

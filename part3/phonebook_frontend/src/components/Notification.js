const Notification = ({ notification }) => {
  return (
    <div className={notification.type === 'error' 
                                          ? 'notification error' 
                                          : 'notification success'}
    >
      {notification.text}
    </div>
  )
};

export default Notification;

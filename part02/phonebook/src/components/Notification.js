const Notification = ({ text, success }) => (
  <div className={success ? 'success' : 'error'}>{text}</div>
);

export default Notification;

import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      dispatch(setNotification('Logged Out', 'success'));
    } catch (error) {
      dispatch(setNotification(error.message, 'error'));
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;

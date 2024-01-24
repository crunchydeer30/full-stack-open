import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button } from 'react-bootstrap';

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

  return <div onClick={handleLogout}>Log Out</div>;
};

export default LogoutButton;

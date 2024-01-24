import { useSetUser } from '../context/UserContext';
import { Button } from '@mui/material';
import { useSetNotification } from '../context/NotificationContext';

const LogoutButton = () => {
  const setUser = useSetUser();
  const setNotification = useSetNotification();

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    setNotification('Logged In', 'success');
  };

  return (
    <Button onClick={handleLogout} color='inherit' variant='outlined'>
      Logout
    </Button>
  );
};

export default LogoutButton;

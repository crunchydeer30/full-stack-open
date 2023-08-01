import { useSetUser } from '../context/UserContext';

const LogoutButton = () => {
  const setUser = useSetUser();

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

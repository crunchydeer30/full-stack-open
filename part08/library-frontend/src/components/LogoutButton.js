import { useSetUser } from '../UserContext';
import { useApolloClient } from '@apollo/client';

const LogoutButton = () => {
  const client = useApolloClient();
  const setUser = useSetUser();

  const logout = () => {
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };

  return <button onClick={logout}>Logout</button>;
};
export default LogoutButton;

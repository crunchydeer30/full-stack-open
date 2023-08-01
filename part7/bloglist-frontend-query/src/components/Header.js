import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header = () => {
  const user = useContext(UserContext)[0];
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Link to='/'>BlogApp</Link>
      <Link to='/blogs'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <p>Singed In as {user.username}</p>
      <LogoutButton />
    </nav>
  );
};

export default Header;

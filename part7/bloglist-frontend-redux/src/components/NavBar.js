import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const loggedUser = useSelector((state) => state.loggedUser);

  const navigationStyle = {
    display: 'flex',
    gap: '1rem',
    margin: '.5rem 0',
    background: 'lightgray',
    padding: '.5rem'
  };

  return (
    <nav style={navigationStyle}>
      <Link to='/blogs'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <div>
        <span>{loggedUser.username} logged in&nbsp;</span>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavBar;

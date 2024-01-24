import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

import LogoutButton from './LogoutButton';

const Navbar = () => {
  const [user] = useContext(UserContext);
  console.log(user);
  return (
    <nav>
      <Link to='/authors'>Authors</Link>
      <Link to='/books'>Books</Link>
      {user ? (
        <>
          <Link to='/create'>Create</Link>
          <LogoutButton />
        </>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;

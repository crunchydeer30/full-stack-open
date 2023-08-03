import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/authors'>Authors</Link>
      <Link to='/books'>Books</Link>
      <Link to='/create'>Create</Link>
    </nav>
  );
};

export default Navbar;

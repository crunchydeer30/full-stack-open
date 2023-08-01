import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

const Header = () => {
  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <Navbar
      expand='lg'
      bg='primary'
      variant='dark'
      className='px-3 py-2 justify-content-between'
    >
      <Nav className='me-auto'>
        <Navbar.Brand href='/' as='span'>
          <Link to='/' className='text-white text-decoration-none'>
            BlogApp
          </Link>
        </Navbar.Brand>
        <Nav.Link href='#' as='span'>
          <Link to='/blogs' className='text-white text-decoration-none'>
            Blogs
          </Link>
        </Nav.Link>
        <Nav.Link href='/users' as='span'>
          <Link to='/users' className='text-white text-decoration-none'>
            Users
          </Link>
        </Nav.Link>
      </Nav>
      {loggedUser && (
        <NavDropdown title={`Signed in as: ${loggedUser.name}`} className='text-white'>
          <NavDropdown.Item>
            <LogoutButton />
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Navbar>
  );
};

export default Header;

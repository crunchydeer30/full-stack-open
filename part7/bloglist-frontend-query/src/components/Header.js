import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ mr: 2 }}>
          BlogApp
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button color='inherit' component={Link} to='/blogs'>
            Blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
        </Box>
        <Box>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import { useEffect, useRef, useContext } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleagble from './components/Toggleable';
import BlogList from './components/BlogList';
import { useSetUser } from './context/UserContext';
import UserContext from './context/UserContext';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo';
import BlogInfo from './components/BlogInfo';
import Header from './components/Header';
import { Container } from '@mui/material';

const App = () => {
  const user = useContext(UserContext)[0];
  const setUser = useSetUser();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <Container>
          <Notification />
          <LoginForm />
        </Container>
      </>
    );
  }

  return (
    <div>
      <Header />
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/blogs/:id' element={<BlogInfo />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<UserInfo />} />
      </Routes>
    </div>
  );
};

export default App;

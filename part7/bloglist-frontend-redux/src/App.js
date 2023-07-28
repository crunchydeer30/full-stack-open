import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { setUser } from './reducers/loginReducer';
import { Routes, Route, useMatch } from 'react-router-dom';

import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleagble from './components/Toggleable';
import LogoutButton from './components/LogoutButton';
import Users from './components/UserList';
import UserInfo from './components/UserInfo';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  if (!loggedUser) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <Notification />
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserInfo />} />
      </Routes>
      <h1>Blogs</h1>
      <div>
        <span>{loggedUser.username} logged in&nbsp;</span>
        <LogoutButton />
      </div>
      <Toggleagble buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm />
      </Toggleagble>
      <BlogList user={loggedUser} />
    </div>
  );
};

export default App;

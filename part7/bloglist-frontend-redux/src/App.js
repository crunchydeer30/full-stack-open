import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { setUser } from './reducers/loginReducer';
import { Routes, Route } from 'react-router-dom';

import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleagble from './components/Toggleable';
import LogoutButton from './components/LogoutButton';
import Users from './components/UserList';
import UserInfo from './components/UserInfo';
import BlogInfo from './components/BlogInfo';
import NavBar from './components/NavBar';

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
      <h1>Blogs</h1>
      <NavBar />
      <Toggleagble buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm />
      </Toggleagble>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserInfo />} />
        <Route path='/blogs/:id' element={<BlogInfo />} />
      </Routes>
    </div>
  );
};

export default App;

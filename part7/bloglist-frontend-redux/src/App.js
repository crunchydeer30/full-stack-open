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
import Notification from './components/Notification';
import Users from './components/UserList';
import UserInfo from './components/UserInfo';
import BlogInfo from './components/BlogInfo';
import Header from './components/Header';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

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
        <Header />
        <Notification />
        <LoginForm />
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
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserInfo />} />
        <Route path='/blogs/:id' element={<BlogInfo />} />
      </Routes>
    </div>
  );
};

export default App;

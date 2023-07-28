import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleagble from './components/Toggleable';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
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
      <div>
        <span>{user.username} logged in&nbsp;</span>
        <LogoutButton />
      </div>
      <Toggleagble buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm />
      </Toggleagble>
      <BlogList user={user} />
    </div>
  );
};

export default App;

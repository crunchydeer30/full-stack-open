import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleagble from './components/Toggleable';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const [notification, setNotification] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');

      blogService.setToken(user.token);

      const message = 'Succesful Log In';
    } catch (exception) {
      const message = 'Wrong usename or password';
    }
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    const message = 'Logged Out';
  };

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
        <Notification />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>
      <div>
        <span>{user.username} logged in&nbsp;</span>
        <button onClick={() => handleLogout()}>Log Out</button>
      </div>
      <Toggleagble buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm />
      </Toggleagble>
      <BlogList user={user} />
    </div>
  );
};

export default App;

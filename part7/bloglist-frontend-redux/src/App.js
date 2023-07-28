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
      showNotification(message, 'success');
    } catch (exception) {
      const message = 'Wrong usename or password';
      showNotification(message, 'error');
    }
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    const message = 'Logged Out';
    showNotification(message, 'success');
  };

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibilty();

      returnedBlog.user = user;

      const message = `a new blog "${newBlog.title}" by ${newBlog.author} added`;
      showNotification(message, 'success');
    } catch (exception) {
      const message = exception.response.data.error;
      showNotification(message, 'error');
    }
  };

  const removeBlog = async (blog) => {
    const confirmation = window.confirm(
      `Remove "${blog.title}" by ${blog.author}`
    );
    if (!confirmation) return;

    try {
      await blogService.remove(blog.id);
      // setBlogs(blogs.filter((b) => b.id !== blog.id));
      const message = `Blog "${blog.title}" by ${blog.author} was removed`;
      showNotification(message, 'success');
    } catch (exception) {
      const message = exception.response.data.error;
      showNotification(message, 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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
        {notification && <Notification notification={notification} />}
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
      {notification && <Notification notification={notification} />}
      <h1>Blogs</h1>
      <div>
        <span>{user.username} logged in&nbsp;</span>
        <button onClick={() => handleLogout()}>Log Out</button>
      </div>
      <Toggleagble buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Toggleagble>
      <BlogList />
    </div>
  );
};

export default App;

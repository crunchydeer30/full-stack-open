import { useEffect, useRef, useContext } from 'react';
import { useSetNotification } from './context/NotificationContext';
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

const App = () => {
  const setNotification = useSetNotification();
  const user = useContext(UserContext)[0];
  const setUser = useSetUser();

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
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
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<UserInfo />} />
      </Routes>
      <h1>Blogs</h1>
      <div>
        <span>{user.username} logged in&nbsp;</span>
        <button onClick={() => handleLogout()}>Log Out</button>
      </div>
      <Toggleagble buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm />
      </Toggleagble>
    </div>
  );
};

export default App;

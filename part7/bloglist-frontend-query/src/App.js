import { useState, useEffect, useRef } from 'react';
import { useSetNotification } from './NotificationContext';
import { useQuery } from 'react-query';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleagble from './components/Toggleable';
import axios from 'axios';

const App = () => {
  const setBlogs = null;
  const setNotification = useSetNotification();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const result = useQuery(
    'blogs',
    () => {
      axios
        .get('http://localhost:3003/api/blogs')
        .then((response) => response.data);
    },
    { refetchOnWindowFocus: false }
  );
  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  // const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setNotification('Logged In', 'success');
      setUser(user);
      setUsername('');
      setPassword('');

      blogService.setToken(user.token);
    } catch (exception) {
      const message = 'Wrong usename or password';
      setNotification(message, 'error');
    }
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  };

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibilty();

      returnedBlog.user = user;
      setBlogs(blogs.concat(returnedBlog));

      const message = `a new blog "${newBlog.title}" by ${newBlog.author} added`;
      showNotification(message, 'success');
    } catch (exception) {
      const message = exception.response.data.error;
      showNotification(message, 'error');
    }
  };

  const likeBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog);
      setBlogs((blogs) =>
        blogs.map((blog) =>
          blog.id === returnedBlog.id
            ? { ...blog, likes: blog.likes + 1 }
            : blog
        )
      );
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
      setBlogs(blogs.filter((b) => b.id !== blog.id));
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
        <BlogForm addBlog={addBlog} />
      </Toggleagble>
      {/* <section className='bloglist'>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </section> */}
    </div>
  );
};

export default App;

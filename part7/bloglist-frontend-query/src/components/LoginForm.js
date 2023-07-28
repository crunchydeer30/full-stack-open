import { useState } from 'react';
import { useMutation } from 'react-query';
import { useSetNotification } from '../context/NotificationContext';
import { useSetUser } from '../context/UserContext';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = () => {
  const setNotification = useSetNotification();
  const setUser = useSetUser();

  const loginMutation = useMutation(loginService.login, {
    onSuccess: (loggedUser) => {
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      setNotification('Logged In', 'success');
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      setUsername('');
      setPassword('');
    },
    onError: () => {
      setNotification('Wrong username or password', 'error');
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <section>
      <h1>Log In to Application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button id='login-button'>Log In</button>
      </form>
    </section>
  );
};

export default LoginForm;

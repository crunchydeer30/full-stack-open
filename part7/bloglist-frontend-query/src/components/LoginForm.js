import { useState } from 'react';
import { useMutation } from 'react-query';
import { useSetNotification } from '../context/NotificationContext';
import { useSetUser } from '../context/UserContext';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

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
          <TextField
            size='small'
            placeholder='Username'
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <TextField
            size='small'
            placeholder='Password'
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type='submit'
          id='login-button'
          variant='contained'
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
      </form>
    </section>
  );
};

export default LoginForm;

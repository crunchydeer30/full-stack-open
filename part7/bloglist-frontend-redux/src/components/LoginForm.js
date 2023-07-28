import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = { username, password };
      await dispatch(loginUser(user));
      dispatch(setNotification('Logged In', 'success'));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log();
      dispatch(setNotification('Wrong username or password', 'error'));
    }
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

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/loginReducer';
import { Button, Container, Form } from 'react-bootstrap';

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
    <Container className='mt-4'>
      <h1>Log In to Application</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label htmlFor='username'>Username: </Form.Label>
          <Form.Control
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password: </Form.Label>
          <Form.Control
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type='submit' id='login-button' className='mt-4'>Log In</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;

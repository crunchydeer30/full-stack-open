import { useMutation } from '@apollo/client';
import { useNotify } from '../NotificationContext';
import UserContext, { useSetUser } from '../UserContext';
import { useContext, useEffect, useState } from 'react';
import { LOGIN } from '../queries';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const notify = useNotify();
  const [user] = useContext(UserContext);
  const setUser = useSetUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setUser(token);
      navigate('/');
    }
  }, [result.data]); // eslint-disable-line

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  if (user) {
    return <div>Already Logged In</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default LoginForm;

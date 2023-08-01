import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <Container className='pt-4'>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Users;

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <section>
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
              <td>{user.username}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Users;

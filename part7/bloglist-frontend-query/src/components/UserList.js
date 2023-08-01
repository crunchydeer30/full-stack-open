import { useQuery } from 'react-query';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const UserList = () => {
  const result = useQuery('users', userService.getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Service not available due to problems in server</div>;
  }

  const users = result.data;
  const usersToShow = users.sort((a, b) => b.blogs.length - a.blogs.length);

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
          {usersToShow.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserList;

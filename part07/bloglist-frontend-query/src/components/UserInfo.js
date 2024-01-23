import { useQuery } from 'react-query';
import userService from '../services/users';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

const UserInfo = () => {
  const id = useParams().id;
  const result = useQuery('user', () => userService.getById(id));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Not Found</div>;
  }
  const user = result.data;
  const blogs = user.blogs;

  return (
    <Container>
      <h1>{user.username}</h1>
      <h2>Added Blogs</h2>
      {blogs.length ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>User has not added any blogs yet</p>
      )}
    </Container>
  );
};

export default UserInfo;

import { useQuery } from 'react-query';
import userService from '../services/users';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  const id = useParams().id;
  const result = useQuery('user',() => userService.getById(id));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Not Found</div>;
  }
  const user = result.data;
  const blogs = user.blogs;

  return (
    <section>
      <h1>{user.username}</h1>
      <h2>Added Blogs</h2>
      {blogs.length ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>User has not added any blogs yet</p>
      )}
    </section>
  );
};

export default UserInfo;

import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) return <p>User not found</p>;

  const blogs = user.blogs;
  return (
    <Container className='pt-4'>
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

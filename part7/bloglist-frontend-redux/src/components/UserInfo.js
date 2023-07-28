import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserInfo = () => {
  const id = useParams().id;
  const user = useSelector(state => state.users.find(u => u.id === id));

  if (!user) return <p>User not found</p>;

  const blogs = user.blogs;
  return (
    <section>
      <h1>{user.username}</h1>
      <h2>Added Blogs</h2>
      {blogs ? (
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

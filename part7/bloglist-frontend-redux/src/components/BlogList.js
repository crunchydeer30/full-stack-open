import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const blogsToShow = blogs.slice(0).sort((a, b) => b.likes - a.likes);

  return (
    <section className='bloglist'>
      {blogsToShow.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // // likeBlog={likeBlog}
          // // removeBlog={removeBlog}
          user={user}
        />
      ))}
    </section>
  );
};

export default BlogList;

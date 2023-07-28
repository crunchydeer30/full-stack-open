import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogsToShow = blogs.slice(0).sort((a, b) => b.likes - a.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <section className='bloglist'>
      {blogsToShow.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </section>
  );
};

export default BlogList;

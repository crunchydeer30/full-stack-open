import { useQuery, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const result = useQuery('blogs', blogService.getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Service not available due to problems in server</div>;
  }

  const blogs = result.data;
  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <section className='bloglist'>
      <h1>Blogs</h1>
      {blogsToShow.map((blog) => (
        <article key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </article>
      ))}
    </section>
  );
};

export default BlogList;

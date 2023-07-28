import { useQuery, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import Blog from './Blog';

const BlogList = () => {
  const result = useQuery('blogs', blogService.getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const blogs = result.data;
  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <section className='bloglist'>
      {blogsToShow.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // likeBlog={likeBlog}
          // removeBlog={removeBlog}
          // user={user}
        />
      ))}
    </section>
  );
};

export default BlogList;

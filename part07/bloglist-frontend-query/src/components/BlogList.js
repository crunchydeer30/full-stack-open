import { useQuery } from 'react-query';
import blogService from '../services/blogs';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { Card } from '@mui/material';
import BlogForm from './BlogForm';

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
    <Container className='bloglist'>
      <h1>Blogs</h1>
      <BlogForm />
      {blogsToShow.map((blog) => (
        <Card key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Card>
      ))}
    </Container>
  );
};

export default BlogList;

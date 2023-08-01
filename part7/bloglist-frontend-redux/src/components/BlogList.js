import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog } from '../reducers/blogReducer';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogsToShow = blogs.slice(0).sort((a, b) => b.likes - a.likes);

  return (
    <Container className='bloglist mt-4'>
      <h1>Blogs</h1>
      <BlogForm />
      <section className='row mt-5'>
        {blogsToShow.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </section>
    </Container>
  );
};

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    try {
      dispatch(likeBlog({ ...blog, user: blog.user.id }));
      dispatch(setNotification(`Liked "${blog.title}"`, 'success', 5));
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5));
    }
  };

  return (
    <Card className='col-lg-4 mb-4 p-4' as='article'>
      <Card.Header>
        <Link
          to={`/blogs/${blog.id}`}
          className='text-decoration-none text-black'
        >
          <Card.Title>{blog.title}</Card.Title>
        </Link>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          URL: <a href={blog.url}>{blog.url}</a>
        </Card.Text>
        <Card.Text>Author: {blog.author}</Card.Text>
        <Card.Text>
          Added by:{' '}
          <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-between align-items-center'>
        <Card.Text>Likes: {blog.likes}</Card.Text>
        <Button variant='outline-primary' onClick={handleLike}>
          Like
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BlogList;

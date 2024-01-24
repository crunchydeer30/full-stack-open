import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import CommentForm from './CommentForm';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogInfo = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  console.log(blog);

  const dispatch = useDispatch();

  if (!blog) return <p>Blog not found</p>;

  const handleLike = () => {
    try {
      dispatch(likeBlog({ ...blog, user: blog.user.id }));
      dispatch(setNotification(`Liked "${blog.title}"`, 'success', 5));
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5));
    }
  };

  return (
    <Container className='pt-4'>
      <section>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div className='likes'>
          <span>Likes: {blog.likes}&nbsp;</span>
          <Button onClick={handleLike} className='btn__like'>
            like
          </Button>
        </div>
        <p>
          Added by{' '}
          <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
        </p>
      </section>
      <section>
        <h3>Comments</h3>
        <CommentForm blog={blog} />
        {blog.comments ? (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </section>
    </Container>
  );
};

export default BlogInfo;

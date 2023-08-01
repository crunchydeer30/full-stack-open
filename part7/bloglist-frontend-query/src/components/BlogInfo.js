import { useQuery, useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSetNotification } from '../context/NotificationContext';
import CommentForm from './CommentForm';

const BlogInfo = () => {
  const id = useParams().id;
  const queryClient = useQueryClient();
  const result = useQuery('blog', () => blogService.getById(id));
  const setNotification = useSetNotification();
  const handleLikeMutation = useMutation(blogService.update, {
    onSuccess: (newObject) => {
      queryClient.invalidateQueries('blog');
      setNotification(`Liked "${newObject.title}"`, 5);
    },
    onError: (error) => {
      setNotification(error.message, 'error', 5);
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Not Found</div>;
  }
  const blog = result.data;

  const handleLike = () => {
    handleLikeMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
  };

  return (
    <>
      <section>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div className='likes'>
          <span>Likes: {blog.likes}&nbsp;</span>
          <button onClick={handleLike} className='btn__like'>
            like
          </button>
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
    </>
  );
};

export default BlogInfo;

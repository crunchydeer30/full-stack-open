import { useQuery } from 'react-query';
import blogService from '../services/blogs';
import { useParams } from 'react-router';

const BlogInfo = () => {
  const id = useParams().id;
  const result = useQuery('blog', () => blogService.getById(id));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Not Found</div>;
  }
  const blog = result.data;

  const handleLike = () => {
    // try {
    //   dispatch(likeBlog({ ...blog, user: blog.user.id }));
    //   dispatch(setNotification(`Liked for "${blog.title}"`, 'success', 5));
    // } catch (error) {
    //   dispatch(setNotification(error.message, 'error', 5));
    // }
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
        <p>Added by {blog.user.username}</p>
      </section>
      <section>
        <h3>Comments</h3>
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

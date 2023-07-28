import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogInfo = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const dispatch = useDispatch();

  if (!blog) return <p>Blog not found</p>;

  const handleLike = () => {
    try {
      dispatch(likeBlog({ ...blog, user: blog.user.id }));
      dispatch(setNotification(`Voted for "${blog.title}"`, 'success', 5));
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5));
    }
  };

  return (
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
  );
};

export default BlogInfo;

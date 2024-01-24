import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const [content, resetContent] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [info, resetInfo] = useField('text');

  const navigate = useNavigate();

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.showNotification(`a new anecdote "${content.value}" created!`);
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;

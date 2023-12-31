import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';
import EditAuthorForm from './EditAuthorForm';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.isError) {
    return <div>Service is not available due to problems on the server</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthorForm authors={authors} />
    </div>
  );
};

export default Authors;

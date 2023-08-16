import { useQuery} from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react'; 

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (result.loading) return <div>Loading...</div>;

  if (result.error) {
    return <div>Service is not available due to problems on the server</div>;
  }

  const books = result.data.allBooks;
  let genres = new Set();
  if (books) {
    books.forEach((book) => book.genres.forEach((genre) => genres.add(genre)));
    genres = Array.from(genres);
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        <h3>Filter by genre</h3>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value=''>---</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
};

export default Books;

import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS, ME } from '../queries';

const RecommendedBooks = () => {
  const [favoriteGenre, setFavoriteGenre] = useState('');

  const user = useQuery(ME);

  useEffect(() => {
    if (user.data) {
      setFavoriteGenre(user.data.me.favoriteGenre);
    }
  }, [user.data]);

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  });

  if (books.loading) return <div>Loading...</div>;

  if (books.error) {
    return <div>Service is not available due to problems on the server</div>;
  }

  const favoriteBooks = books.data.allBooks;

  return (
    <table>
      <tbody>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Published</th>
          <th>Genres</th>
        </tr>
        {favoriteBooks.map((book) => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
            <td>{book.genres.join(' ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecommendedBooks;

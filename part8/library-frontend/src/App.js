import { Routes, Route } from 'react-router-dom';
import { useInitUser } from './UserContext';
import { useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import RecommendedBooks from './components/RecommendedBooks';
import { ALL_BOOKS, BOOK_ADDED } from './queries';
import { useNotify } from './NotificationContext';

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const initUser = useInitUser();
  const client = useApolloClient();
  const notify = useNotify();

  useEffect(() => {
    initUser();
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log('added a book');
      const addedBook = data.data.bookAdded;
      notify(`${addedBook} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  return (
    <div>
      <Navbar />
      <Notification />
      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/create' element={<NewBook />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/recommended' element={<RecommendedBooks />} />
      </Routes>
    </div>
  );
};

export default App;

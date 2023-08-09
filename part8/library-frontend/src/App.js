import { Routes, Route } from 'react-router-dom';
import { useInitUser } from './UserContext';
import { useEffect } from 'react';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import RecommendedBooks from './components/RecommendedBooks';

const App = () => {
  const initUser = useInitUser();

  useEffect(() => {
    initUser();
  }, []);

  

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

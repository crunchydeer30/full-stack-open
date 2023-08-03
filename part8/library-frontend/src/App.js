import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/create' element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;

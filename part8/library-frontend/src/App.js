import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <Navbar />
      <Notification />
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

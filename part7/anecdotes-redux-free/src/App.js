import { useState } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import CreateNew from './components/CreateNew';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import Menu from './components/Menu';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See{' '}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((a) => a.id === +match.params.id)
    : null;

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <section>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      <Routes>
        <Route
          path='/anecdotes/:id'
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path='/create'
          element={
            <CreateNew addNew={addNew} showNotification={showNotification} />
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </section>
  );
};

export default App;

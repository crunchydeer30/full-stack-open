import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(10));

  const maxVotes = Math.max(...points);
  const mostVoted = maxVotes !== 0 ? points.indexOf(Math.max(...points)) : null;

  function handleNext() {
    setSelected(random(0, anecdotes.length));
  }

  function handleVote() {
    const tmp = [...points];
    tmp[selected] += 1;
    setPoints(tmp);
  }

  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div>
      <section>
        <Heading text='Anecdote of the day' />
        <Anecdote text={anecdotes[selected]} votes={points[selected]} />
        <Button handleClick={handleVote} text='vote' />
        <Button handleClick={handleNext} text='next anecdote' />
      </section>
      <section>
        <Heading text='Anecdote with most votes' />
        {mostVoted ? (
          <Anecdote text={anecdotes[mostVoted]} votes={points[mostVoted]} />
        ) : (
          <p>No votes yet</p>
        )}
      </section>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Heading = ({ text }) => <h1>{text}</h1>;

const Anecdote = ({ text, votes }) => {
  return (
    <article>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </article>
  );
};
export default App;

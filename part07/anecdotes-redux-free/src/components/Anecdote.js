const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <p>has {anecdote.votes} votes</p>
      <h2>{anecdote.content}</h2>
    </div>
  );
};

export default Anecdote;

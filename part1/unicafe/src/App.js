import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodReview = () => {
    setGood((g) => g + 1);
  };

  const handleNeutralReview = () => {
    setNeutral((n) => n + 1);
  };

  const handleBadReview = () => {
    setBad((b) => b + 1);
  };

  return (
    <section>
      <section>
        <Heading text='Give feedback' />
        <Button handleClick={handleGoodReview} text='good' />
        <Button handleClick={handleNeutralReview} text='neutral' />
        <Button handleClick={handleBadReview} text='bad' />
      </section>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </section>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all) {
    const average = (good - bad) / all;
    const positive = (good / all) * 100;

    return (
      <section>
        <Heading text='statistics' />
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive + '%'} />
          </tbody>
        </table>
      </section>
    );
  } else {
    return (
      <section>
        <p>No feedback given</p>
      </section>
    );
  }
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export default App;

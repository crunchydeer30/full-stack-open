const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>;
};

export default Total;

const Filter = ({ filter, setFilter }) => {
  return (
    <>
      <label htmlFor='filter'>Filter by name: </label>
      <input
        type='text'
        id='filter'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  );
};

export default Filter;

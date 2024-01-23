const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type='text'
      placeholder='Search countries'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;

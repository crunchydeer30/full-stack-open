import SearchItem from './SearchItem';

const SearchResults = ({ results, setQuery }) => {
  return (
    <>
      {results.length < 10 ? (
        <ul>
          {results.map((item) => (
            <SearchItem
              text={item.name.common}
              setQuery={setQuery}
              key={item.name.common}
            />
          ))}
        </ul>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </>
  );
};

export default SearchResults;

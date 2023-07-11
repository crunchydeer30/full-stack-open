import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search = ({ query, setQuery, searchResults }) => {
  return (
    <section>
      <SearchBar query={query} setQuery={setQuery} />
      {query && searchResults.length !== 1 && (
        <SearchResults results={searchResults} setQuery={setQuery} />
      )}
    </section>
  );
};

export default Search;

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Search from './components/Search';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const filterSearch = (data, query) => {
    return data.filter((country) => {
      const commonName = country.name.common.toLowerCase();
      const officialName = country.name.official.toLowerCase();

      return (
        commonName.includes(query.toLowerCase()) ||
        officialName.includes(query.toLowerCase())
      );
    });
  };

  const searchResults = query ? filterSearch(countries, query) : [];

  return (
    <div className='App'>
      <Search query={query} setQuery={setQuery} searchResults={searchResults} />
      {searchResults.length === 1 && <Country data={searchResults} />}
    </div>
  );
}

export default App;

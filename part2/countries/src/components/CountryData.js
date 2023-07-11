const CountryData = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = Object.values(country.languages);
  const flagUrl = country.flags.svg;

  return (
    <section>
      <h1>{name}</h1>
      <p>captial: {capital}</p>
      <p>area: {area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flagUrl} alt={`Flag of ${name}`} className='flag' />
    </section>
  );
};

export default CountryData;

import axios from 'axios';
import { useEffect, useState } from 'react';

import CountryData from './CountryData';
import WeatherData from './WeatherData';

const Country = ({ data }) => {
  const [weatherData, setWeatherData] = useState(null);
  const country = data[0];

  useEffect(() => {
    const API_KEY = process.env.REACT_WEATHER;
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?q=${country.capital}&aqi=no&key=${API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data.current);
      })
      .catch((error) => {
        alert('Error occured when loading weather data');
      });
  }, []);

  return (
    <section>
      <CountryData country={country} />
      <WeatherData data={weatherData} city={country.capital} />
    </section>
  );
};

export default Country;

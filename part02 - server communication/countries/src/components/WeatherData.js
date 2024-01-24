const WeatherData = ({ data, city }) => {
  if (!data) return;

  const tempCelsius = data.temp_c;
  const condition = data.condition.text;
  const iconUrl = data.condition.icon;
  const windMph = data.wind_mph;

  return (
    <section>
      <h2>Weather in {city}</h2>
      <p>Temperature: {data.temp_c} Celsius</p>
      <img src={iconUrl} alt={condition} />
      <p>Wind: {windMph}kph</p>
    </section>
  );
};

export default WeatherData;

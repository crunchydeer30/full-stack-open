import { useState } from 'react';
import { DiaryEntryFormProps, Weather } from '../types';
import { Visibility } from '../types';

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.addDiaryEntry({
      date,
      visibility,
      weather,
      comment,
    });
    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  return (
    <section>
      <h1>Add new entry</h1>
      <form onSubmit={addDiaryEntry}>
        <div>
          <label htmlFor='date'>Date: </label>
          <input
            type='date'
            placeholder='1970-01-01'
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <span>Visibility: </span> 
          <input type="radio" name="visibility" id="visibility-great" value='great' onChange={() => setVisibility(Visibility.Great)} />
          <label htmlFor="visibility-great">great</label>
          <input type="radio" name="visibility" id="visibility-good" value='good' onChange={() => setVisibility(Visibility.Good)} />
          <label htmlFor="visibility-good">good</label>
          <input type="radio" name="visibility" id="visibility-ok" value='ok' onChange={() => setVisibility(Visibility.Ok)} />
          <label htmlFor="visibility-ok">ok</label>
          <input type="radio" name="visibility" id="visibility-poor" value='poor' onChange={() => setVisibility(Visibility.Poor)} />
          <label htmlFor="visibility-poor">poor</label>
        </div>
        <div>
        <span>Weather: </span> 
          <input type="radio" name="weather" id="weather-great" value='great' onChange={() => setWeather(Weather.Sunny)} />
          <label htmlFor="weather-Sunny">sunny</label>
          <input type="radio" name="weather" id="weather-good" value='good' onChange={() => setWeather(Weather.Rainy)} />
          <label htmlFor="weather-rainy">rainy</label>
          <input type="radio" name="weather" id="weather-cloudy" value='cloudy' onChange={() => setWeather(Weather.Cloudy)} />
          <label htmlFor="weather-cloudy">cloudy</label>
          <input type="radio" name="weather" id="weather-stormy" value='stormy' onChange={() => setWeather(Weather.Stormy)} />
          <label htmlFor="weather-stormy">stormy</label>
          <input type="radio" name="weather" id="weather-windy" value='windy' onChange={() => setWeather(Weather.Windy)} />
          <label htmlFor="weather-windy">windy</label>
        </div>
        <div>
          <label htmlFor='comment'>Comment: </label>
          <input
            type='text'
            placeholder='your comment'
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};

export default DiaryEntryForm;

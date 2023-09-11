import { useState } from 'react';
import { DiaryEntryFormProps } from '../types';

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      props.addDiaryEntry({
        date,
        visibility,
        weather,
        comment,
      });
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error) {
      let errorMessage = 'Something went wrong';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      console.log(errorMessage);
    }
  };

  return (
    <section>
      <h1>Add new entry</h1>
      <form onSubmit={addDiaryEntry}>
        <div>
          <label htmlFor='date'>Date: </label>
          <input type='date' placeholder='1970-01-01' onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor='visibility'>Visibility: </label>
          <input type='text' placeholder='best ever' onChange={e => setVisibility(e.target.value)} />
        </div>
        <div>
          <label htmlFor='weather'>Weather: </label>
          <input type='text' placeholder='sunny' onChange={e => setWeather(e.target.value)} />
        </div>
        <div>
          <label htmlFor='comment'>Comment: </label>
          <input type='text' placeholder='your comment' onChange={e => setComment(e.target.value)} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};

export default DiaryEntryForm;

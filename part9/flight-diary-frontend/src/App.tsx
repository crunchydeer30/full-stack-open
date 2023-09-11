import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { DiaryEntry, NewDiaryEntry } from './types';
import DiaryEntries from './components/DiaryEntries';
import DiaryEntryForm from './components/DiaryEntryForm';
import axios from 'axios';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    try {
      diaryService.getAll().then((response) => {
        setDiaryEntries(response);
      });
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        errorMessage += ': ' + error.message;
      }
      console.log(errorMessage);
    }
  }, []);

  const addDiaryEntry = (newEntry: NewDiaryEntry) => {
    try {
      diaryService
        .addEntry(newEntry)
        .then((data) => setDiaryEntries([...diaryEntries, data]));
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        errorMessage += ': ' + error.message;
      }
      console.log(errorMessage);
    }
  };

  return (
    <div className='App'>
      <DiaryEntryForm addDiaryEntry={addDiaryEntry} />
      <DiaryEntries entries={diaryEntries} />
    </div>
  );
}

export default App;

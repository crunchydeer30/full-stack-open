import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { DiaryEntry, NewDiaryEntry } from './types';
import DiaryEntries from './components/DiaryEntries';
import DiaryEntryForm from './components/DiaryEntryForm';
import Notification from './components/Notification';
import axios from 'axios';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notifcation, setNotification] = useState('');

  useEffect(() => {
    try {
      diaryService.getAll().then((response) => {
        setDiaryEntries(response);
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notify(error.response?.data);
      }
      console.error(error);
    }
  }, []);

  const addDiaryEntry = async (newEntry: NewDiaryEntry) => {
    try {
      const returnedEntry = await diaryService.addEntry(newEntry);
      setDiaryEntries([...diaryEntries, returnedEntry]);
    } catch (error: unknown) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        notify(error.response?.data);
      }
      console.error(error);
    }
  };

  const notify = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  }

  return (
    <div className='App'>
      <Notification message={notifcation} />
      <DiaryEntryForm addDiaryEntry={addDiaryEntry} />
      <DiaryEntries entries={diaryEntries} />
    </div>
  );
}

export default App;

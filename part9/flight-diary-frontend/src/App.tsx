import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { DiaryEntry } from './types';
import DiaryEntries from './components/DiaryEntries';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    try {
      diaryService.getAll().then((response) => {
        setDiaryEntries(response);
      });
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      console.log(errorMessage);
    }
  }, []);

  return (
    <div className='App'>
      <DiaryEntries entries={diaryEntries} />
    </div>
  );
}

export default App;

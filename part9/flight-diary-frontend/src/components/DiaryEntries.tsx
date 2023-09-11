import { DiaryEntriesProps } from '../types';
import Entry from './Entry';


const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <section className='diary-entries'>
      <h1>Diary Entries</h1>
      {props.entries.map(entry => (
        <Entry entry={entry} key={entry.id} />
      ))}
    </section>
  )
}

export default DiaryEntries;
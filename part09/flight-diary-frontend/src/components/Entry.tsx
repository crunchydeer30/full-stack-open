import { DiaryEntryProps } from '../types';

const Entry = (props: DiaryEntryProps) => {
  return (
    <article className='diary-entry'>
      <p className='diary-entry__date'>{props.entry.date}</p>
      <p>visibility: {props.entry.visibility}</p>
      <p>{props.entry.weather}</p>
    </article>
  );
};

export default Entry;
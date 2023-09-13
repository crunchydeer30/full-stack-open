import { OccupationalHealthcareEntry as Entry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: Entry
};

const OccupationalHealthcareEntry = ({entry} : Props) => {
  return (
    <article className='entry'>
      <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>Diagnose by: {entry.specialist}</p>
    </article>
  );
}

export default OccupationalHealthcareEntry;
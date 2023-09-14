import { OccupationalHealthcareEntry as Entry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';
import DiagnosisInfo from './DiagnosisInfo';

interface Props {
  entry: Entry
};

const EntryOccupational = ({entry} : Props) => {
  return (
    <article className='entry'>
      <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>Diagnose by: {entry.specialist}</p>
      {entry.sickLeave && <p>Sick leave: {new Date(entry.sickLeave.startDate).toLocaleDateString()} - {new Date(entry.sickLeave.endDate).toLocaleDateString()}</p>}
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <DiagnosisInfo code={code} key={code} />
          ))}
        </ul>
      )}
    </article>
  );
}

export default EntryOccupational;
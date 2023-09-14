import { HospitalEntry as Entry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DiagnosisInfo from './DiagnosisInfo';

interface Props {
  entry: Entry
};

const EntryHospital = ({entry}: Props) => {
  return (
    <article className='entry'>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p>{entry.description}</p>
      <p>Diagnose by: {entry.specialist}</p> 
      <p>{entry.discharge.date} - {entry.discharge.criteria}</p>
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

export default EntryHospital;
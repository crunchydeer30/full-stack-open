import { HospitalEntry as Entry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: Entry
};

const HospitalEntry = ({entry}: Props) => {
  return (
    <article className='entry'>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p>{entry.description}</p>
      <p>Diagnose by: {entry.specialist}</p> 
      <p>{entry.discharge.date} - {entry.discharge.criteria}</p> 
    </article>
  );
}

export default HospitalEntry;
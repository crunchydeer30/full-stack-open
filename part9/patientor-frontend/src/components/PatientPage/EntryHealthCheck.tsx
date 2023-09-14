import {
  HealthCheckEntry as Entry,
  HealthCheckRating as Rating,
} from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { assertNever } from '../../utils';
import DiagnosisInfo from './DiagnosisInfo';

interface Props {
  entry: Entry;
}

const pickIconColor = (entry: Entry): string => {
  switch (entry.healthCheckRating) {
    case Rating.CriticalRisk:
      return 'red';
    case Rating.HighRisk:
      return 'orangered';
    case Rating.LowRisk:
      return 'yellow';
    case Rating.Healthy:
      return 'green';
    default:
      return assertNever(entry.healthCheckRating);
  }
};

const EntryHealthCheck = ({ entry }: Props) => {
  const iconStyle = {
    fill: pickIconColor(entry),
  };

  return (
    <article className='entry'>
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>
      <p>{entry.description}</p>
      <FavoriteIcon style={iconStyle} />
      <p>Diagnose by: {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <DiagnosisInfo code={code} key={code} />
          ))}
        </ul>
      )}
    </article>
  );
};

export default EntryHealthCheck;

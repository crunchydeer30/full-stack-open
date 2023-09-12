import { Entry } from '../../types';

import DiagnosisInfo from './DiagnosisInfo';

interface Props {
  entry: Entry;
}

const PatientEntry = (props: Props) => {
  return (
    <article>
      <p>
        {props.entry.date}: {props.entry.description}
      </p>
      <ul>
        {props.entry.diagnosisCodes?.map((code) => (
          <DiagnosisInfo code={code} key={code} />
        ))}
      </ul>
    </article>
  );
};


export default PatientEntry;

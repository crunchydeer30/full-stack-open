import { Entry, EntryType } from '../../types';
import { assertNever } from '../../utils';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcateEntry';

interface Props {
  entry: Entry;
  setNotification: (notificationMessage: string) => void
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.HealthCheckEntry:
      return <HealthCheckEntry entry={entry} />
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

import { Entry, EntryType } from '../../types';
import { assertNever } from '../../utils';
import EntryHealthCheck from './EntryHealthCheck';
import EntryHospital from './EntryHospital';
import EntryOccupational from './EntryOccupational';

interface Props {
  entry: Entry;
  setNotification: (notificationMessage: string) => void
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <EntryHospital entry={entry} />;
    case EntryType.HealthCheckEntry:
      return <EntryHealthCheck entry={entry} />
    case EntryType.OccupationalHealthcare:
      return <EntryOccupational entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

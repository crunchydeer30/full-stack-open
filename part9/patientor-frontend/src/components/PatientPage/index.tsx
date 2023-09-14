import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entry, EntryType, NewEntry, Patient } from '../../types';
import EntryDetails from './EntryDetails';
import patientService from '../../services/patients';
import FormHealthCheck from './FormHealthCheck';
import { isAxiosError } from 'axios';
import FormOccupational from './FormOccupational';
import FormHospital from './FormHospital';
import { assertNever } from '../../utils';
import { Select, MenuItem } from '@mui/material';

interface Props {
  setNotification: (notificationMessage: string) => void;
}

const PatientPage = ({ setNotification }: Props) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>();
  const [formType, setFormType] = useState<EntryType>(EntryType.Hospital);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const entry = await patientService.getById(id);
      console.log(entry);
      setPatient(entry);
      setEntries(entry.entries);
    };
    try {
      if (id) {
        fetchPatient(id);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, [id]);

  const handleAddEntry = async (newEntry: NewEntry) => {
    if (id) {
      try {
        const data = await patientService.createEntry(id, newEntry);
        setEntries(entries?.concat(data));
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          setNotification(error.response?.data);
        }
        console.log(error);
      }
    }
  };

  const showEntryForm = () => {
    switch (formType) {
      case EntryType.Hospital:
        return (
          <FormHospital
            handleAddEntry={handleAddEntry}
            setNotification={setNotification}
          />
        );
      case EntryType.HealthCheckEntry:
        return (
          <FormHealthCheck
            handleAddEntry={handleAddEntry}
            setNotification={setNotification}
          />
        );
      case EntryType.OccupationalHealthcare:
        return (
          <FormOccupational
            handleAddEntry={handleAddEntry}
            setNotification={setNotification}
          />
        );
      default:
        assertNever(formType);
    }
  };

  return (
    <section>
      <h2>{patient?.name}</h2>
      <p>Gender: {patient?.gender}</p>
      <p>SSN: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <div>
        <h3>Select Entry Type</h3>
        <Select
          label='Entry type'
          fullWidth
          value={formType}
          onChange={(e) => setFormType(e.target.value as EntryType)}
        >
          <MenuItem value={EntryType.Hospital}>Hospital Entry</MenuItem>
          <MenuItem value={EntryType.HealthCheckEntry}>
            Health Check Entry
          </MenuItem>
          <MenuItem value={EntryType.OccupationalHealthcare}>
            Occupational Healthcare Entry
          </MenuItem>
        </Select>
      </div>
      {showEntryForm()}
      <section>
        <h3>Entries</h3>
        {entries?.length ? (
          entries?.map((entry) => (
            <EntryDetails
              entry={entry}
              key={entry.id}
              setNotification={setNotification}
            />
          ))
        ) : (
          <p>No entries</p>
        )}
      </section>
    </section>
  );
};

export default PatientPage;

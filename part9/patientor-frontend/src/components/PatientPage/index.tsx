import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entry, NewEntry, Patient } from '../../types';
import EntryDetails from './EntryDetails';
import patientService from '../../services/patients';
import EntryForm from './EntryForm';

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>();

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
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      <h2>{patient?.name}</h2>
      <p>Gender: {patient?.gender}</p>
      <p>SSN: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <EntryForm handleAddEntry={handleAddEntry} />
      <section>
        <h3>Entries</h3>
        {entries?.length ? (
          entries?.map((entry) => <EntryDetails entry={entry} key={entry.id} />)
        ) : (
          <p>No entries</p>
        )}
      </section>
    </section>
  );
};

export default PatientPage;

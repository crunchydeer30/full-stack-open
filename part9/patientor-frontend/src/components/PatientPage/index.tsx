import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entry, Patient } from '../../types';
import PatientEntry from './PatientEntry';
import patientService from '../../services/patients';

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>();

  useEffect(() => {
    const fetchPatientEntry = async (id: string) => {
      const entry = await patientService.getById(id);
      console.log(entry);
      setPatient(entry);
      setEntries(entry.entries);
    };
    try {
      if (id) {
        fetchPatientEntry(id);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, [id]);

  return (
    <section>
      <h2>{patient?.name}</h2>
      <p>Gender: {patient?.gender}</p>
      <p>SSN: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>

      <section>
        <h3>Entries</h3>
        {entries?.map((entry) => (
          <PatientEntry entry={entry} key={entry.id} />
        ))}
      </section>
    </section>
  );
};

export default PatientPage;

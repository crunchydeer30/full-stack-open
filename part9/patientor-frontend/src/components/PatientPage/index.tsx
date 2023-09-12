import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import patientService from '../../services/patients'

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatientEntry = async (id: string) => {
      const entry = await patientService.getById(id);
      setPatient(entry);
    }
    try {
      if (id) {
        fetchPatientEntry(id);
      }
    } catch (error: unknown) {
      console.log(error)
    }
  }, [patient, id])

  return <section>
    <h2>{patient?.name}</h2>
    <p>Gender: {patient?.gender}</p>
    <p>SSN: {patient?.ssn}</p>
    <p>Occupation: {patient?.occupation}</p>
  </section>
}

export default PatientPage;
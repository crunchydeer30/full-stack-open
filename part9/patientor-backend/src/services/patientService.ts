import patientEntries from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getAllPatientEntries = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    })
  );
};

const getPatientEntry = (id: string): Patient | undefined => {
  console.log(patientEntries);
  return patientEntries.find(entry => entry.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  return {
    id: uuid(),
    ...entry
  };
};

export default {
  getPatientEntry,
  getAllPatientEntries,
  addPatient
};

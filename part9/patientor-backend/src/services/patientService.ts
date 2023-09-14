import patients from '../../data/patients';
import patientEntries from '../../data/patients';
import {
  NewPatient,
  NonSensitivePatient,
  Patient,
  Entry,
  NewEntry,
} from '../types';
import { v4 as uuid } from 'uuid';

const getAllPatientEntries = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatientEntry = (id: string): Patient | undefined => {
  return patientEntries.find((entry) => entry.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) throw new Error('Invalid patient id');
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientEntry,
  getAllPatientEntries,
  addPatient,
  addPatientEntry,
};

import patientEntries from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatientEntries = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  return {
    id: uuid(),
    ...entry
  };
};

export default {
  getPatientEntries,
  addPatient
};

import patientEntries from '../../data/patients';
import { NonSensitivePatient } from '../types';

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

export default {
  getPatientEntries,
};

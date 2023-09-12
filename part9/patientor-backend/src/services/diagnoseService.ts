import diagnoseEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoseEntries = (): Diagnosis[] => {
  return diagnoseEntries;
};

const getDiagnoseEntry = (id: string): Diagnosis | undefined => {
  return diagnoseEntries.find((entry) => entry.code === id);
};

export default {
  getDiagnoseEntries,
  getDiagnoseEntry,
};

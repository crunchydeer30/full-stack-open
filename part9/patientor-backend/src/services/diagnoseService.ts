import diagnoseEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoseEntries = (): Diagnosis[] => {
  return diagnoseEntries;
};

export default {
  getDiagnoseEntries,
};

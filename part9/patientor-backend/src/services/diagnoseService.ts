import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoseEntries = (): Diagnose[] => {
  return diagnoseEntries;
};

export default {
  getDiagnoseEntries,
};

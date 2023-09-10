import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.status(200).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong,';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(404).send(errorMessage);
    }
  }
});

export default router;
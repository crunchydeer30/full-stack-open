import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPatientEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatient= toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatient);
    res.status(200).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong,';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(404).send(errorMessage);
    }
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  try {
    const patientEntry = patientService.getPatientEntry(id);
    res.status(200).json(patientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong,';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(404).send(errorMessage);
    }
  }
});


router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addPatientEntry(id, newEntry);
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

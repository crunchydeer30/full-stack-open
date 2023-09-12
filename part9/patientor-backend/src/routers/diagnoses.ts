import express from 'express';
import diagnoseService from '../services/diagnoseService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoseEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const diagnosis = diagnoseService.getDiagnoseEntry(id);
    res.status(200).json(diagnosis);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong,';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(404).send(errorMessage);
    }
  }
});

export default router;
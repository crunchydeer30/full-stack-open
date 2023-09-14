import { useState } from 'react';
import { EntryType, HealthCheckRating, NewHealthCheckEntry } from '../../types';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DiagnosisButton from './DiagnosisButton';

interface Props {
  handleAddEntry: (newEntry: NewHealthCheckEntry) => Promise<void>;
  setNotification: (notificationMessage: string) => void;
}

const FormHealthCheck = ({ handleAddEntry, setNotification }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, sethHealthCheckRating] =
    useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date: date.toString(),
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes,
      type: EntryType.HealthCheckEntry as EntryType.HealthCheckEntry,
    };
    handleAddEntry(newEntry);
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCode('');
    setDiagnosisCodes([]);
  };

  const addDiagnosisCode = () => {
    if (!diagnosisCode || diagnosisCodes.includes(diagnosisCode)) return;
    setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
    setDiagnosisCode('');
  };

  const removeDiagnosisCode = (code: string) => {
    setDiagnosisCodes(diagnosisCodes.filter((c) => c !== code));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <h3>New Entry</h3>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          required
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <Select
          required
          label='Health Rating'
          fullWidth
          value={healthCheckRating}
          onChange={(e) => sethHealthCheckRating(+e.target.value)}
        >
          <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
          <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
          <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
          <MenuItem value={HealthCheckRating.CriticalRisk}>
            Critical Risk
          </MenuItem>
        </Select>
        <TextField
          required
          label='Diagonsis code'
          fullWidth
          value={diagnosisCode}
          onChange={(e) => setDiagnosisCode(e.target.value)}
        />
        <Button variant='contained' onClick={addDiagnosisCode} disabled={!diagnosisCode}>
          Add diagnosis
        </Button>
        <section>
          {diagnosisCodes.map((code) => (
            <DiagnosisButton
              code={code}
              key={code}
              removeDiagnosisCode={removeDiagnosisCode}
            />
          ))}
        </section>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue as string)}
        />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default FormHealthCheck;

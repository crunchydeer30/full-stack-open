import { useState } from 'react';
import { EntryType, HealthCheckRating } from '../../types';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { EntryFormProps } from '../../types';
import SelectDiagnoses from './SelectDiagnoses';

const FormHealthCheck = ({ handleAddEntry, diagnosesList}: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, sethHealthCheckRating] =
    useState<HealthCheckRating>(HealthCheckRating.Healthy);
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
    console.log(diagnosisCodes);
    
    handleAddEntry(newEntry);
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <h3>New Entry</h3>
        <TextField
          required
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

        <p>Diagnoses codes</p>
        <SelectDiagnoses
          diagnosesList={diagnosesList}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />

        <p>Date</p>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue as string)}
        />
        <div>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </div>
      </form>
    </LocalizationProvider>
  );
};

export default FormHealthCheck;

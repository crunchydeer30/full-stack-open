import { useState } from 'react';
import { EntryType, NewEntry } from '../../types';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { EntryFormProps } from '../../types';
import SelectDiagnoses from './SelectDiagnoses';

const FormOccupational = ({ handleAddEntry, diagnosesList}: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newEntry: NewEntry = {
      description,
      date: date.toString(),
      specialist,
      employerName,
      diagnosisCodes: diagnosisCodes,
      type: EntryType.OccupationalHealthcare as EntryType.OccupationalHealthcare,
    };

    if (startDate && endDate) {
      newEntry = {...newEntry, sickLeave: {startDate, endDate}}
    }

    handleAddEntry(newEntry);
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setEmployerName('');
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

        <TextField
          required
          label='Employer name'
          fullWidth
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />

        <div>
          <p>Sick leave</p>
          <DatePicker
            label='Start date'
            value={startDate}
            onChange={(newValue) => setStartDate(newValue as string)}
          />
          <DatePicker
            label='End date'
            value={endDate}
            onChange={(newValue) => setEndDate(newValue as string)}
          />
        </div>

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

export default FormOccupational;

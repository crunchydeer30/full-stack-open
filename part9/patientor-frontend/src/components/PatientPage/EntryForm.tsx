import { useState } from 'react';
import { EntryType, HealthCheckRating, NewHealthCheckEntry } from '../../types';

interface Props {
  handleAddEntry: (newEntry: NewHealthCheckEntry) => Promise<void>
}

const EntryForm = ({ handleAddEntry}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, sethHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes.split(', '),
      type: EntryType.HealthCheckEntry as EntryType.HealthCheckEntry,
    }
    handleAddEntry(newEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Entry</h3>
      <input
        type='text'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type='date'
        placeholder='Date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type='text'
        placeholder='Specialist'
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      <input
        type='number'
        placeholder='Healthcheck rating'
        value={healthCheckRating}
        onChange={(e) => sethHealthCheckRating(+e.target.value)}
      />
      <input
        type='text'
        placeholder='Diagnosis codes'
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default EntryForm;

import { Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import diagnosesService from '../../services/diagnoses';

interface Props {
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>
  diagnosisCodes: object
}

const DiagnosisSelect = ({setDiagnosisCodes}: Props) => {
  const [diagnosisList, setDiagnosisList] = useState<Array<{code: string, name: string}>>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Array<string>>([]);

  

  return <Select multiple value={selectedDiagnosis} onChange={(e) => setDiagnosisCodes}>
    {diagnosisList.map((d) => (
      <MenuItem value={d.code}>{d.code} - {d.name}</MenuItem>
    ))}
  </Select>
}

export default DiagnosisSelect;
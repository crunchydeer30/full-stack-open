import { MenuItem, Select } from '@mui/material'
import { Diagnosis } from '../../types'

interface Props {
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>> 
  diagnosesList: Diagnosis[] | undefined
}

const SelectDiagnoses = ({diagnosisCodes, setDiagnosisCodes, diagnosesList}: Props) => {
  return (
    <Select multiple value={diagnosisCodes} onChange={e => setDiagnosisCodes(Array.from(e.target.value))}>
      {diagnosesList?.map(d => (
        <MenuItem key={d.code} value={d.code}>{d.code}</MenuItem>
      ))}
    </Select>
  )
}

export default SelectDiagnoses; 
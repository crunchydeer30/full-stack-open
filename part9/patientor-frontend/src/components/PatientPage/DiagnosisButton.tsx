import { Button } from '@mui/material';

interface Props {
  code: string;
  removeDiagnosisCode: (code: string) => void;
}

const DiagnosisButton = ({ code, removeDiagnosisCode }: Props) => {
  return (
    <Button
      variant='contained'
      color='error'
      onClick={() => removeDiagnosisCode(code)}
    >
      {code}
    </Button>
  );
};

export default DiagnosisButton;

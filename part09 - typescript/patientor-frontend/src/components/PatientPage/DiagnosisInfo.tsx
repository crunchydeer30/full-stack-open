import { useEffect, useState } from 'react';
import { Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

interface Props {
  code: string;
}

const DiagnosisInfo = (props: Props) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();

  useEffect(() => {
    const fetchDiagnosisInfo = async (id: string) => {
      const data = await diagnosesService.getById(id);
      setDiagnosis(data);
    }
    fetchDiagnosisInfo(props.code);
  }, [props.code])

  return (<li>
    {props.code}: {diagnosis?.name}
  </li>)
}

export default DiagnosisInfo;
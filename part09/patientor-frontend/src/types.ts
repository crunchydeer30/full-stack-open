type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export interface EntryFormProps {
  diagnosesList: Diagnosis[] | undefined;
  handleAddEntry: (newEntry: NewEntry) => Promise<void>;
  setNotification: (notificationMessage: string) => void;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 1,
  'LowRisk' = 2,
  'HighRisk' = 3,
  'CriticalRisk' = 4,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheckEntry;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheckEntry = 'HealthCheckEntry',
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewEntry = UnionOmit<Entry, 'id'>;
import {
  Entry,
  EntryType,
  Gender,
  NewEntry,
  NewPatient,
  Diagnosis,
  NewBaseEntry,
  HealthCheckRating,
} from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing!');
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'type' in object
  ) {
    const baseEntry: NewBaseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: parseEntryType(object.type),
    };

    switch (baseEntry.type) {
      case EntryType.HealthCheckEntry:
        if ('healthCheckRating' in object) {
          return {
            ...baseEntry,
            type: EntryType.HealthCheckEntry,
            healthCheckRating: parseHealthRating(object.healthCheckRating),
          };
        }
        break;
      case EntryType.OccupationalHealthcare:
        if ('employerName' in object && 'sickLeave' in object) {
          return {
            ...baseEntry,
            type: EntryType.OccupationalHealthcare,
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeaves(object.sickLeave),
          };
        }
        break;
      case EntryType.Hospital:
        if ('discharge' in object) {
          return {
            ...baseEntry,
            type: EntryType.Hospital,
            discharge: parseDischarge(object.discharge),
          };
        }
        break;
      default:
        return assertNever(baseEntry.type);
    }
  }

  throw new Error('Incorrect data: some fields are missing!');
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isString(entryType) || !isEntryType(entryType)) {
    throw new Error('Incorrect or missing entry type: ' + entryType);
  }

  return entryType;
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || !isHealthRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }

  return rating;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseEntries = (entires: unknown): Entry[] => {
  if (
    !entires ||
    !Array.isArray(entires) ||
    !isEntriesArray(entires as object[])
  ) {
    throw new Error('Incorrect or missing entries: ' + entires);
  }
  return entires as Entry[];
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }

  return employerName;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge && 'criteria' in discharge) ||
    !(
      isString(discharge.criteria) &&
      isString(discharge.date) &&
      isDate(discharge.date)
    )
  ) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge as { date: string; criteria: string };
};

const parseSickLeaves = (
  sickLeaves: unknown
): { startDate: string; endDate: string } => {
  if (
    !sickLeaves ||
    typeof sickLeaves !== 'object' ||
    !('startDate' in sickLeaves && 'endDate' in sickLeaves) ||
    !(
      isString(sickLeaves.startDate) &&
      isDate(sickLeaves.startDate) &&
      isString(sickLeaves.endDate) &&
      isDate(sickLeaves.endDate)
    )
  ) {
    throw new Error('Incorrect or missing sick leaves: ' + sickLeaves);
  }
  return sickLeaves as { startDate: string; endDate: string };
};

const isEntriesArray = (array: object[]): boolean => {
  return !array.some((e) => {
    if (typeof e !== 'object') {
      return false;
    }
    return isEntry(e);
  });
};

const isEntry = (entry: object): entry is Entry => {
  if (!entry || !('type' in entry) || !isString(entry.type)) {
    return false;
  }
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(entry.type);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(param);
};

const isHealthRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

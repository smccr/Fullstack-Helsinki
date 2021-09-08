import { NewPatient, Gender, Entry, HealthCheckRating } from './types';

const isString = (text : unknown) : text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown) : string => {
  if(!text || !isString(text)) {
    throw new Error('Incorrect or missing');
  }
  return text;
};

const parseName = (name: unknown) : string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSpecialist = (specialist: unknown) : string => {
  if(!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDescription = (description: unknown) : string => {
  if(!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseEmployerName = (employer: unknown) : string => {
  if(!employer || !isString(employer)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employer;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (healthRating: unknown) : HealthCheckRating => {
  if(!healthRating || !isHealthRating(healthRating)) {
    throw new Error('Incorrect or missing health rating');
  }
  return healthRating;
};

const isDate = (date : string) : boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown) : string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSsn = (ssn: unknown) : string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown) : Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown) : string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing name');
  }
  return occupation;
};

type newPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown
};

export const toNewPatient = ( { name, dateOfBirth, ssn, gender, occupation } : newPatientFields ) : NewPatient => {
  const patient : NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return patient;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatientEntry = (entry: Entry) : Entry => {
  switch(entry.type) {
    case "HealthCheck":
      const healthCheckNewEntry : Entry = {
        type: entry.type,
        id: "",
        date: "",
        specialist: parseSpecialist(entry.specialist),
        description: parseDescription(entry.description),
        healthCheckRating: parseHealthRating(entry.healthCheckRating)
      };
      console.log("health", healthCheckNewEntry);

      if(entry.diagnosisCodes) {
        healthCheckNewEntry.diagnosisCodes = entry.diagnosisCodes;
      }

      return healthCheckNewEntry;
    
    case "OccupationalHealthcare":
      const occupationalHealthEntry : Entry = {
        type: entry.type,
        id: "",
        date: "",
        specialist: parseSpecialist(entry.specialist),
        description: parseDescription(entry.description),
        employerName: parseEmployerName(entry.employerName)
      };

      if(entry.diagnosisCodes) {
        occupationalHealthEntry.diagnosisCodes = entry.diagnosisCodes;
      }

      if(entry.sickLeave) {
        occupationalHealthEntry.sickLeave = {
          startDate: parseDate(entry.sickLeave.startDate),
          endDate: parseDate(entry.sickLeave.endDate)
        };
      }

      return occupationalHealthEntry;
      

    case "Hospital":
      const hospitalEntry : Entry = {
        type: entry.type,
        id: "",
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        description: parseDescription(entry.description),
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseString(entry.discharge.criteria)
        }
      };

      return hospitalEntry;
        
    default:
      return assertNever(entry);
  }
};
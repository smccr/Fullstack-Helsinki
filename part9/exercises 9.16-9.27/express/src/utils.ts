import { NewPatient, Gender } from './types';

const isString = (text : unknown) : text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown) : string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date : string) : boolean => {
  return Boolean(Date.parse(date));
};

/*
const isEntry = (entry : unknown) : entry is Array<Entry> => {
  console.log(typeof entry);
  return true; // fix this
};
*/

const parseDateOfBirth = (date: unknown) : string => {
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
    throw new Error('Incorrer or missing weather');
  }
  return gender;
};

const parseOccupation = (occupation: unknown) : string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing name');
  }
  return occupation;
};

/*
const parseEntries = (entries: unknown) : Array<Entry> => {
  if(!entries || !isEntry(entries) ) {
    throw new Error('Incorrect or missing entries');
  }
  return entries;
};
*/



type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown
};

const toNewPatient = ( { name, dateOfBirth, ssn, gender, occupation } : Fields ) : NewPatient => {
  const patient : NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return patient;
};

export default toNewPatient;
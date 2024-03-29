import patientsData from '../../data/patients';
import {v1 as uuid} from 'uuid';

import { PublicPatient, Patient, NewPatient, Entry } from '../types';

const patients: Array<Patient> = patientsData;

const getAllPatients = () : Array<PublicPatient> => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};


const addPatient = (patient : NewPatient) : Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (entry : Entry, id : string) : Entry => {
  const findPatient = patients.find(patient => patient.id === id);
  const newEntry = {
    ...entry,
    date: new Date().toISOString().slice(0, 10),
    id: uuid()
  };

  findPatient?.entries.push(newEntry);

  return newEntry;
};

const getPatient = (id : string) : Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};


export default { getAllPatients, addPatient, getPatient, addPatientEntry };
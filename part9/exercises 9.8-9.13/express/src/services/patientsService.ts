import patientsData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';

import { NonSsnPatient, Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientsData;

const getAllPatients = () : Array<NonSsnPatient> => {
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
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};


export default { getAllPatients, addPatient };
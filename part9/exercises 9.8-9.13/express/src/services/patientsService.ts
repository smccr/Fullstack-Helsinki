import patientsData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';

import { NonSsnPatient, Patient } from '../types';

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


const addPatient = (name: string, dateOfBirth: string, ssn: string, gender : string, occupation: string) : Patient => {
  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  patients.push(newPatient);
  return newPatient;
};


export default { getAllPatients, addPatient };
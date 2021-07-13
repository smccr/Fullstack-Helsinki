import patientsData from '../../data/patients.json';

import { NonSsnPatient } from '../types';

const getAllPatients = () : Array<NonSsnPatient> => {
  return patientsData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

export default { getAllPatients };
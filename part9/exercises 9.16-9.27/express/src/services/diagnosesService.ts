import diagnosesData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getAllDiagnoses = () : Array<Diagnose> => {
  return diagnoses;
};

export default { getAllDiagnoses };
import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
    }
  | {
      type:"GET_DIAGNOSES";
      payload: Diagnosis[];
  }
  | {
      type:"ADD_ENTRY";
      payload: Entry
  };
    

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };

    case "GET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnostic) => ({ ...memo, [diagnostic.code]: diagnostic }),
            {}
          ),
          ...state.diagnoses
        }
      };
      
    case "ADD_ENTRY":
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: [
            ...state.patient.entries,
            action.payload
          ]
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients : Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (newPatient: Patient) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const getPatient = (patient: Patient) : Action => {
  return {
    type: "GET_PATIENT",
    payload: patient
  };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]) : Action => {
  return {
    type: "GET_DIAGNOSES",
    payload: diagnosis
  };
};

export const addEntry = (entry: Entry) : Action => {
  return {
    type: "ADD_ENTRY",
    payload: entry
  };
};

import React, { useEffect } from "react";
import axios from "axios";
import { Card, Header, Icon } from "semantic-ui-react";

import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

import { useParams } from "react-router";

import { useStateValue, getPatient, setDiagnosisList } from "../state";

import EntryDetails from "./EntryDetails";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        const { data: diagnosesData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(getPatient(patientData));
        dispatch(setDiagnosisList(diagnosesData));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [id]);

  const getGenderIcon = () => {
    switch (patient.gender) {
      case "male":
        return (<Icon fitted name="mars" />);
      case "female":
        return (<Icon fitted name="venus" />);
      case "other":
        return (<Icon fitted name="neuter" />);
    }
  };

  return (
    <div className="App">
      <Header as="h2">
        {patient?.name} {getGenderIcon()}
      </Header>
      ssn: {patient?.ssn} <br />
      occupation: {patient?.occupation} <br />
      date of birth: {patient?.dateOfBirth} <br />

      <h3>Entries</h3>
      {patient.entries.length === 0 && <p>No entries found</p>}
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <Card.Group>
          <EntryDetails entry={entry} diagnoses={diagnoses}/>
          </Card.Group>
        </div>
      ))}
    </div>
  );
};

export default PatientDetail;

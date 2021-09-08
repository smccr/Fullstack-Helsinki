import React, { useEffect } from "react";
import axios from "axios";
import { Card, Header, Icon, Button } from "semantic-ui-react";

import { Patient, Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";

import { useParams } from "react-router";

import { useStateValue, getPatient, setDiagnosisList, addEntry } from "../state";

import EntryDetails from "./EntryDetails";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const newValues = {...values, healthCheckRating: Number(values.healthCheckRating)};

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
      );

      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />



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

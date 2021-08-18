import React from "react";
import { Icon, Card } from "semantic-ui-react";
import { Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, Diagnosis } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const heartColor = (rating: number) => {
  switch (rating) {
    case 0:
      return <Icon name="heart" color="green" />;
    case 1:
      return <Icon name="heart" color="yellow" />;
    case 2:
      return <Icon name="heart" color="orange" />;
    case 3:
      return <Icon name="heart" color="red" />;
  }
};

const Hospital = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses : { [id: string]: Diagnosis; } }) => (
  <Card fluid>
    <Card.Content>
    <h4>{entry.date}<span>&nbsp;&nbsp;&nbsp;<Icon fitted name="hospital" size="large" /></span></h4>
      {entry.specialist}<br />
      {entry.description}
      {entry.diagnosisCodes && <h5>Diagnosis</h5>}
      {entry.diagnosisCodes?.map(diagnosisCode => (<p key={diagnosisCode}>{diagnosisCode} {diagnoses[diagnosisCode]?.name}</p>))}
      <h5>Discharge</h5>
      {entry.discharge.date} <br/>
      {entry.discharge.criteria}
    </Card.Content>
  </Card>
);

const OccupationalHealthcare = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses : { [id: string]: Diagnosis; } }) => (
  <Card fluid>
    <Card.Content>
      <h4>{entry.date}<span>&nbsp;&nbsp;&nbsp;<Icon fitted name="stethoscope" size="large" /></span><span>&nbsp;&nbsp;{entry.employerName}</span></h4>
      {entry.specialist}<br />
      {entry.description}<br />
      {entry.diagnosisCodes && <h5>Diagnosis</h5>}
      {entry.diagnosisCodes?.map(diagnosisCode => (<p key={diagnosisCode}>{diagnosisCode} {diagnoses[diagnosisCode]?.name}</p>))}
      <h5>Sick leave</h5>
      From {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
    </Card.Content>
  </Card>
);

const HealthCheck = ({ entry }: { entry: HealthCheckEntry; }) => {
  return (<Card fluid>
    <Card.Content>
      <h4>{entry.date}<span>&nbsp;&nbsp;&nbsp;<Icon fitted name="doctor" size="large" /></span></h4>
      {entry.specialist}<br />
      {entry.description}<br />
      {heartColor(entry.healthCheckRating)}
    </Card.Content>
  </Card>);
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses : { [id: string]: Diagnosis; } }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
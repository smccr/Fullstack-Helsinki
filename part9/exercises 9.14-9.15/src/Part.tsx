import React from 'react';
import { CoursePart } from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em>
        </p>
      )

    case "groupProject":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          Project exercises {part.groupProjectCount}
        </p>
      )

    case "submission":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Submit to {part.exerciseSubmissionLink}
        </p>
      )
    case "special":
      return(
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Required skills: {part.requirements.map(skill => `${skill}, `)}
        </p>
      )
    default:
      return assertNever(part);
  }
};

export default Part;
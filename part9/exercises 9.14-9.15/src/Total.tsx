import React from 'react';

interface courseParts {
  exerciseCount: number;
}

const Total = ({parts} : { parts: courseParts[]; } ) =>
  (<>
    Number of exercises:
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </>);

export default Total;
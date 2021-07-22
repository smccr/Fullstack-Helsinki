import React from 'react';
interface courseParts {
  name: string;
  exerciseCount: number;
}

const Content = ({parts} : { parts: courseParts[]; } ) : JSX.Element => {
  return(<>
  {parts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>)}
  </>);
};

export default Content;
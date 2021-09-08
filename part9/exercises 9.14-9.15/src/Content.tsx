import React from 'react';
import Part from './Part';
import { CoursePart } from './types';


const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (<>
    {parts.map(part => <Part key={part.name} part={part}/>)}
  </>)
}
export default Content;
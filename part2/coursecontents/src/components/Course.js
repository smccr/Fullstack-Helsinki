import React from 'react';

const Course = ({ courses }) => {
  const courseComponents = courses.map(course =>
    <div key={course.id} >
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>

  )
  return courseComponents;
}

const Header = ({ name }) => {
  return (<h1>{name}</h1>)
}

const Content = ({ parts }) => {
  const courseContent = parts.map(p => <Part key={p.id} part={p}/>);
  return(<div>{courseContent}</div>)
}

const Part = (props) => {
  return (<p>{props.part.name} {props.part.exercises}</p>)
}

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return (
    <p><strong>Total of {sum} exercises</strong></p>
  )
}

export default Course;
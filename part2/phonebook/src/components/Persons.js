import React from 'react'

const Persons = ({ persons, handleDeleteContact}) => {

  return (<ul>{persons.map(person =>
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      id = {person.id}
      handleDeleteContact={handleDeleteContact}
    />)} </ul>)
}

const Person = ({ name, number, id, handleDeleteContact}) => {
  return (<li>
    {name} {number} <button onClick = {() => handleDeleteContact(id)}>delete</button>
  </li>);
}

export default Persons;
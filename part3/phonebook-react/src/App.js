import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import './components/Notification.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState([]);
  const [message, setMessage] = useState({ message: '', classMessage: '' })

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addContact = () => {
    const existingName = checkName(newName);

    //changes number for a existing contact
    if (existingName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        changeContact(existingName)
      }
    } else {
      //adds a new contact
      const contact = {
        name: newName,
        number: newNumber
      }
      addNewContact(contact);
    }
  }

  const addNewContact = (contact) => {
    personsService
      .create(contact)
      .then(personObject => {
        setPersons(persons.concat(personObject));
        showMessage(`Added ${contact.name}`, 'success')
        clean();
      }).catch(error => {
        showMessage(`Failed to add ${contact.name}. Reason: ${error.response.data.error}`, 'error');
      })
  }

  const changeContact = (existingName) => {
    const contact = {
      id: existingName.id,
      name: newName,
      number: newNumber
    }
    personsService
      .update(existingName.id, contact)
      .then(personsObject => {
        setPersons(persons.map(person => person.id === existingName.id ? contact : { id: person.id, ...person })) // copy the existing array keeping id and making the new changes
        showMessage(`Changed ${contact.name}`, 'success')
        clean();
      }).catch(error => {
        if (error.response.status === 404) {
          showMessage(`Information of ${contact.name} has already been removed from server`, 'error');
        } else {
          showMessage(`Failed to change ${contact.name}. Reason: ${error.response.data.error}`, 'error');
        }
      })
  }

  const clean = () => {
    setNewName('');
    setNewNumber('');
    setFindName([]);
  }

  const deleteContact = (id) => {
    const name = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${name} ?`)) {
      personsService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showMessage(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          if (error.response.status === 404) {
            showMessage(`Information of ${name} has already been removed from server`, 'error')
          } else {
            showMessage(`Failed to delete ${name}`, 'error');
          }
        })
    }
  }

  const showMessage = (msg, classMessage) => {
    setMessage({ message: msg, classMessage: classMessage })
    setTimeout(() => {
      setMessage({ message: null, classMessage: null });
    }, 5000)
  }

  const checkName = (newName) => persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleDeleteContact = (id) => deleteContact(id);

  const handleAddContact = (event) => {
    event.preventDefault();
    addContact(event);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} classMessage={message.classMessage} />
      <Filter persons={persons} setFindName={setFindName} />

      <h3>Add a new</h3>
      <PersonForm
        handleAddContact={handleAddContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={findName.length > 0 ? findName : persons}
        handleDeleteContact={handleDeleteContact}
      />

    </div>
  )
}

export default App;
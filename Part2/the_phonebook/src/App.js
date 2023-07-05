// Import Statement
import { useState, useEffect } from 'react'
import React from 'react'
import personService from './services/persons'

// Functions
const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with{' '}
        <input filter={props.filter} onChange={props.handleFilterChange} />
      </div>
    </form>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
const Persons = (props) => {
  return (
    <ul>
      {props.persons.filter((person) =>
        person && person.name && person.name.toLowerCase().includes(props.filter.toLowerCase()))
        .map((person) => (
          <li
            key={person.id}>{person.name} {person.number}
            <button onClick={() => {
              if (window.confirm(`Delete ${person.name}`)) {
                props.handleDeleteContact(person.id)
              }
            }}
            >Delete</button>
          </li>
        ))}
    </ul>
  );
};

// Functional Component App
const App = (props) => {

  // State Variables
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // Event handlers
  useEffect(() => {
    personService
      .getAll()
      .then(initalPerson => {
        setPersons(initalPerson)
      })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName);
        const updatedPerson = { ...personToUpdate, number: newNumber };

        personService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id !== personToUpdate.id) ? person : returnedPerson));
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`There was a problem updating the contact.`);
          });
      }
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  };

  // use some other name for variable!
  const handleDeleteContact = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert(
          `the Contact was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
      });
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // JSX Markup inside return()
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter} handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        handleDeleteContact={handleDeleteContact}
      //handleUpdate={handleUpdate}
      />
    </div>
  )
}

//Export statement
export default App
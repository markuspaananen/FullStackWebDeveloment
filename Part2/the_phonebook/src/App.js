// Import Statement
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

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
/*
const Persons = (props) => {
  return (
    <ul>
      {props.persons.filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase()))
        .map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
    </ul>
  )
}
*/
const Persons = (props) => {
  return (
    <ul>
      {props.persons.filter((person) =>
        person && person.name && person.name.toLowerCase().includes(props.filter.toLowerCase()))
        .map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
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

  /*
    useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
    }, [])
  */
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])



  // Event handlers
  const addName = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      axios
        .post('http://localhost:3001/Persons', nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  };





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
        persons={persons} filter={filter}
      />
    </div>
  )
}

//Export statement
export default App
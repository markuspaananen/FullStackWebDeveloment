// Import Statement
import React, { useState } from 'react'

// Functional Component App
const App = (props) => {

  // State Variables
  const [persons, setPersons] = useState(props.person || []);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


  // Event handler
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
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // JSX Markup inside return()
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with{' '}
          <input value={filter} onChange={(a) => setFilter(a.target.value)} />
        </div>
      </form>

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => (
            <li key={person.id}>{person.name} {person.number}</li>
          ))}
      </ul>
    </div>
  )
}

//Export statement
export default App
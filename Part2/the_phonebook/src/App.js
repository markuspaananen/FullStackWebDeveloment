// Import Statement
import React, { useState } from 'react'

// Functional Component App
const App = (props) => {

  // State Variables
  const [persons, setPersons] = useState(props.person || []);
  const [newName, setNewName] = useState('');

  // Event handler
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  // JSX Markup inside return()
  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

//Export statement
export default App
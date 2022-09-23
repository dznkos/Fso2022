import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import phonebkService from './services/phonebook'

function App() {

  const [persons, setPersons] = useState([])
  //   { name: 'Annie Liver', number: '75-84510598021' },
  //   { name: 'Arnold Portal', number: '54-5991622681' },
  //   { name: 'George Burson', number: '120-2961943365' },
  //   { name: 'Hinoru Ramirez', number: '845-529049132218' },
  // ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    
    phonebkService
      .getAll()
      .then( initialPhones => {
        setPersons(initialPhones)
       })

  }, [])
  
  
  const addPhone = (event) => {
    event.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber
    }

    if ( persons.find( p => p.name === newName ) ){
      setNewName('')
      return alert(`${newName} is already added to phonebook`)
    }

    phonebkService
      .create(newContact)
      .then( returnedContact => {
        setPersons( persons.concat( newContact) )
        setNewName('')
        setNewNumber('')
      })

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>      
      <Filter persons={persons}/>
      <h3>Add a new</h3>
      <PersonForm 
        addPhone={addPhone} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  );
}

export default App;

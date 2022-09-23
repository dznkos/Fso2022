
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";

import phonebkService from './services/phonebook'

import './index.css'

function App() {

  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)

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

    const contact = persons.find( p => p.name.toLowerCase() === newName.toLowerCase())
    
    if ( !contact ) {
      createContact(newContact)
    }
    else
    {
      const msgtext = `${newName} is already added to phonebook, replace the old number with a new one?`
      const confirm = window.confirm(msgtext)

      if (confirm) {        
        updateContact(contact.id, newContact)   
        
        const arrayContact = persons.map( p => {
          var obj = {...p}

          if (p.id === contact.id) {
            obj.number = newNumber
          }
          return obj;
        } )
        setPersons(arrayContact )
        setMessage(`Contact updated ${newName}`)
        setTypeMessage('upd')
        clearFields()   
        setTimeout(() => {
          setMessage(null)
        }, 5000);  
      }
    }

    
  }

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleRemove = (person) => {
    const msgtext = `Delete contact ${person.name} ?` 
    const confirm = window.confirm(msgtext)
    if (confirm) {      
      removeContact(person)
      setMessage(`Contact deleted ${person.name}`)
      setTypeMessage('err')
      setTimeout(() => {
        setMessage(null)
      }, 5000);  
    }    
  }

  const createContact = (newContact) => {
    phonebkService
    .create(newContact)
    .then( returnedContact => {
      setPersons( persons.concat( returnedContact) )
      setMessage(`Contact added ${returnedContact.name}`)
      setTypeMessage('add')
      clearFields()  
      setTimeout(() => {
        setMessage(null)
      }, 5000);      
    })
    .catch( error => {
      setMessage(`Server connection failure, could not be added ${newContact.name}`)
      setTypeMessage('err')
      setTimeout(() => {
        setMessage(null)
      }, 5000);  
    })
  }

  const updateContact = (id,person) => {
    phonebkService
    .update(id, person)
    .then( returnContact => {
      setPersons(persons.map(p => p.id !== id ? p : returnContact))
    })
    .catch( error => {
      setMessage(`Information of ${person.name} has already been removed from server`)
      setTypeMessage('err')
      setPersons( persons.filter( p => p.id !== id) )
      setTimeout(() => {
        setMessage(null)
      }, 5000);  
    })
  }

  const removeContact = (person) => {
    phonebkService
    .remove(person.id)
    .then(  returnContact => {         
      setPersons( persons.filter( p => p.id !== person.id) )
    })
    .catch( error => {
      setMessage(`Information of ${person.name} not exist`)
      setTypeMessage('err')
      setTimeout(() => {
        setMessage(null)
      }, 5000);  
    })
  }
  

  return (
    <div>      
      <h2>Phonebook</h2>      
      <Filter persons={persons}/>
      <h3>Add a new contact</h3>
      <PersonForm 
        addPhone={addPhone} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Notification message={message} typeMessage={typeMessage} />
      {   
      persons.map( (person) => <Person 
          key={person.name}           
          person={person} 
          handleRemove={()=> handleRemove(person)} />        
      )
      }
    </div>
  );
}

export default App;

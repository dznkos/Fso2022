import React from 'react'

const Persons = ({ person, handleRemove}) => {
  return (             
     <li>{person.name} {person.number}  
      <button onClick={handleRemove} >Remove</button>        
     </li>
                   
  )
}

export default Persons
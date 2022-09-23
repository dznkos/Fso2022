import React, { useState } from 'react'

const Filter = ({persons}) => {

const [searchName, setSearchName] = useState('')

const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      filter shown with: <input value={searchName} onChange={handleSearchChange}/>
      <ul>
        {
          searchName.length > 0
          ? persons
             .filter( p => p.name.toLowerCase().includes(searchName.toLowerCase()) )
             .map( p => (
                  <li key={p.name}> {p.name} {p.number}</li>
                  )
              )
          : <strong>No matches found</strong>
        }
      </ul>
    </div>
  )
}

export default Filter
import React from 'react'

import phonebkService from '../services/phonebook'

const Remove = ({id}) => {

  const handleRemove = () => {

    phonebkService
      .remove(id)
      .then(  returnedPhone => {
        returnedPhone
      }       
      )
  }

  return (
    <button onClick={()=>handleRemove()} >Remove</button>
  )
}

export default Remove
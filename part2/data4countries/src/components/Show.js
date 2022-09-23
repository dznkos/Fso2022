import React, { useState } from 'react'
import DetailCountry from './DetailCountry'

const Show = ({country}) => {

  const [show, setShow] = useState(false)

  const handleShowInfo = () => {
    setShow(!show)
  }

  return (    
    (show)
    ? <>
        <button onClick={()=> handleShowInfo()} >Hide Detail</button>  
        <DetailCountry country={country}/>
      </>
    : <button onClick={()=> handleShowInfo()}>Show</button>

  )
}

export default Show
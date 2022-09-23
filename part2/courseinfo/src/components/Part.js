import React from 'react'

export const Part = (props) => {

  const data = props.part;

  return (
    <p>
      {data.name} : {data.exercises}
    </p>
  )
}

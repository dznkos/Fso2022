import React from 'react'

const Total = (props) => {

  const dataCourses = props.courses.parts;

  let nExercises = 0;

  dataCourses.forEach( part => {
    nExercises += part.exercises;
  })

  return (    
      <p>
        Number of exercises: { nExercises }       
      </p>   
  )
}

export default Total
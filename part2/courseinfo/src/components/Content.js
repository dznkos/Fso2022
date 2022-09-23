import React from 'react'
import { Part } from './Part'

const Content = (props) => {

  const listCourse = props.course.parts;

  
  return (
    <>
      {
        listCourse.map( (part) => (
          <Part key={part.id} part={part} />
        ) )
      }     
    </>
  )
}

export default Content
import React from 'react'
import { Part } from './Part'

const Content = (props) => {

  const listCourse = props.courses.parts;

  return (
    <>
       {
        listCourse.map( (part, index) => (
          <Part key={index} part={part} />
        ) )
      }     
    </>
  )
}

export default Content
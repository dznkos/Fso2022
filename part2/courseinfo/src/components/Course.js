import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({courses}) => {

  const TotalCourses = ({ parts }) => {  
    console.log(parts);

    return <strong>
      total of {parts.reduce( (accu, current) => (accu + current.exercises),0)} exercises
    </strong>    
  }

  return (
    <div>
      {
        courses.map( (course)=> {

          return(
          <>
            <Header course={course}/>
            <Content course={course} />
            <TotalCourses parts={course.parts}/>
          </>
          )
        })
      }

      
    </div>
  )
}

export default Course

import React from 'react'

const Header = (props) => {

  const nameCourse = props.course.name;

  return (
    <>
      <h1>{nameCourse}</h1>
    </>
  )
}

export default Header
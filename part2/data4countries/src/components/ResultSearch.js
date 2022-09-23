import React from 'react'
import DetailCountry from './DetailCountry'
import Show from './Show'

const ResultSearch = ({countries:foundCountries, handleShowDetail}) => { 
 
 if(foundCountries.length === 1) {
  return (<DetailCountry country={foundCountries[0]}/>)  
 } 
 
 if(foundCountries.length > 10) return ( <li>Too many matches, specify another filter</li>)

 if( !foundCountries.length) return (<li>No matches found</li>)

 return (foundCountries.map( (country,i) => { 
        return (
          <li style={{listStyleType: "none"}} key={country.name.common}>
            { country.name.common }
            <Show country={country} />
          </li>
        )
  }))  
}

export default ResultSearch
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DetailCountry from './components/DetailCountry';
import ResultSearch from './components/ResultSearch';

const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [showDetail, setShowDetail] = useState(false)

  const foundCountries = countries
    .filter( c => c.name.common.toLowerCase().includes(newSearch.toLowerCase()) )
      

  useEffect(() => {    
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        setCountries( response.data )
      })
  }, [])

  const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
  }

  return (
    <>
      find countries <input type="text" value={newSearch} onChange={handleSearchChange} />
      <ul>
      {
        (showDetail)
        ? <DetailCountry country={foundCountries}/> 
        : <ResultSearch 
          countries={foundCountries}           
        />                                
      }
      </ul>
    </>
  );
}

export default App;

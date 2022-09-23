import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DetailCountry = ({country}) => {

  const [weatherCountry, setWeatherCountry] = useState({
    current: { 
      temperature: 0, 
      wind_speed: 0, 
      wind_dir: '', 
      weather_icons: []
    }
  })

  const { temperature, wind_speed, wind_dir, weather_icons } = weatherCountry.current

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then( response => {
        setWeatherCountry(response.data)        
      })      
  }, []) 

  const GetLang = ({langs}) => {    
    let list = [];

    for(var prop in langs) {
       list.push(langs[prop])
    }

    return (
      <ul>
      {
        list.map( lan => (
          <li key={lan}>{ lan }</li>
        ))
      }
      </ul>
    )
    
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>{String(country.capital)}</p>
      <p>{country.population}</p>
      <h3>languages</h3>    
      <GetLang langs={country.languages}/>  
      <br />         
      <img src={country.flags.png} alt={country.name.common} />

      <h3>Weather in {country.capital}</h3>
      <p><strong>temperature: </strong>{ temperature } Celcius</p>
      <img src={weather_icons[0]} alt="" />
      <p><strong>wind: </strong>{ wind_speed } mph direction { wind_dir }</p>
    </div>
  )
}

export default DetailCountry
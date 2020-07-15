import React, {useState, useEffect} from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY
const weatherURL = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const Countries = ({ countries }) => {
  if (countries.length > 10 || countries.length === 0) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (countries.length > 1 && countries.length < 10) {
    return (<div>{countries.map(country => <SimpleCountry key={country.name} country={country}/>)}</div>)
  }

  return (<FullCountry country={countries[0]}/>)
}

const SimpleCountry = ({ country }) => {
  return(
  <div><li key={country.name}>{country.name} <ShowCountryButton country={country}/></li></div>
  )
}

const FullCountry = ({ country }) => {
  return(
    <div>
      <h1>{country.name}</h1>
      Capital: {country.capital}<br />
      Population: {country.population}<br />
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='flag' height='25%' width='25%' />
      <ShowWeather country={country} />
      
    </div>
  )
}

const ShowCountryButton = ({country}) => {
  const [activated, setActivated] = useState(false)
  const handleShowButton = () => {
    setActivated(!activated);
  }
  return(<>
    <button onClick={handleShowButton}>show</button>
    {activated ? <FullCountry country={country} /> : null}
  </>
  )
}

const ShowWeather = ({country}) => {
  const [weather, setWeather] = useState('')
  useEffect(() => {
    axios.get(`${weatherURL}${country.capital}&appid=${api_key}`).then(response => setWeather(response.data));
  }, [country.capital])
  
  return(
  <div>
    {weather === '' ? null:
    <div>
    Temperature: {weather.main.temp} celsius<br />
    Wind: {weather.wind.speed} m/s
    </div>
    }    
  </div>
  )
}

export default Countries;
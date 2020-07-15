import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return(
  <div>
    <Filter countries={countries} setFilterCountries={setFilterCountries}/>
    <Countries countries={filterCountries} />
  </div>
  )
}



export default App;
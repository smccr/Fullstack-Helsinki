import React from 'react'

const Filter = ({ countries, setFilterCountries }) => {

  const handleSearch = (event) => {
    const found = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilterCountries(found);
  };

  return (
    <div>
      Find countries<input
        onChange={handleSearch}
      />
    </div>
  )
}

export default Filter;
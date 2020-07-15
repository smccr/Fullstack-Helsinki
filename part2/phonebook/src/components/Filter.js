import React from 'react'

const Filter = ({persons, setFindName}) => {
  
  const handleSearch = (event) => {
    const found = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFindName(found);
  };

  return (
    <div>
      filter shown with <input
        onChange={handleSearch}
      />
    </div>
  )
}

export default Filter;
import React from 'react'
import { createFilter } from '../redux/reducers/filterReducer'

import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.createFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  createFilter: createFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
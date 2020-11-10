import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleNoBorder = {
    padding: 10
  }

  return (
    <div style={notification === '' ? styleNoBorder : style}>
      {notification}
    </div>
  )
}

export default Notification
import React from 'react'

const Notification = ({ message, classMessage }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classMessage} >
      {message}
    </div>
  )
}

export default Notification
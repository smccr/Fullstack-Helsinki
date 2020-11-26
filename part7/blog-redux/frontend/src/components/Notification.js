import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification.content) {
    return null;
  }

  if(notification.type === 'success'){
    return(
      <Alert variant='success'>
        {notification.content}
      </Alert>
    )
  } else {
    return(
      <Alert variant='danger'>
        {notification.content}
      </Alert>
    )
  }
}

export default Notification;
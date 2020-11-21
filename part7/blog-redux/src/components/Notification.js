import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (notification.content === null) {
    return null;
  }

  return (
    <div className={notification.type} >
      {notification.content}
    </div>
  );
};

export default Notification;
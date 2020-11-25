import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Menu = ({handleLogout}) => {
  const user = useSelector(state => state.user);
  const style = {
    paddingRight: 5,
    backgroundColor: '#C9C9C9'
  };
  return (
    <div style={style}>
      <Link style={style} to="/">blogs</Link>
      <Link style={style} to="/users">users</Link>
      {user === null ? null : <>{user.name} logged in
        <button onClick={handleLogout}>logout</button></>}
    </div>
  );
};

export default Menu;
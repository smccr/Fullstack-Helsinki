import React from 'react';


const User = ( { blogs } ) => {
  if (!blogs) {
    return null;
  }

  return (
    <div>
      <h1>{blogs.name}</h1>
      <h4>added blogs</h4>
      <ul>
        {blogs.blogs.map(b => <li key={b.id} >{b.title}</li>)}
      </ul>
    </div>
  );
};

export default User;
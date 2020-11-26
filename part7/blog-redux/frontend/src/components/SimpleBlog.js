import React from 'react';

const SimpleBlog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle} className='blog'>
      <li>{`${blog.title} ${blog.author}`}</li>
    </div>
  );
};

export default SimpleBlog;
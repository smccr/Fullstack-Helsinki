import React from 'react';
import { ListGroup } from 'react-bootstrap';


const User = ({ blogs }) => {
  if (!blogs) {
    return null;
  }

  return (
    <div>
      <h1>{blogs.name}</h1>
      <h4>added blogs</h4>
      <ListGroup>
        {blogs.blogs.map(b => <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  );
};

export default User;
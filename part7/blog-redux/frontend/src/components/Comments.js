import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Comment = () => {
  const commentaries = useSelector(state => state.comment);

  if(!commentaries) {
    return null;
  }
  return(
   <ListGroup>
     {commentaries.map(c => <ListGroup.Item as='li' key={c.id}>{c.comment}</ListGroup.Item>)}
   </ListGroup> 
    
  );
};

export default Comment;

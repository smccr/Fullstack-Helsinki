import React from 'react';
import { useSelector } from 'react-redux';

const Comment = () => {
  const commentaries = useSelector(state => state.comment);

  if(!commentaries) {
    return null;
  }
  return(
    <ul>
      {commentaries.map(c => <li key={c.id} >{c.comment}</li>)}
    </ul>
  );
};

export default Comment;
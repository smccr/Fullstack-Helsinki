import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNotification } from '../../redux/reducers/notificationReducer';
import { createComment } from '../../redux/reducers/commentReducer';

import { WAIT_TIME } from '../../App';

const CommentForm = (id) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const addComment = (event) => {
    event.preventDefault();
    try {
      const newComment = {
        comment: comment
      };
      dispatch(createComment(id, newComment));
      dispatch(setNotification('Comment added successfully', 'success', WAIT_TIME));
      setComment('');
    } catch (exception) {
      dispatch(setNotification('Failed to add a new comment', 'error', WAIT_TIME));
    }
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          <input
            id="comment"
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button
            id="submitComment"
            type="submit">add comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
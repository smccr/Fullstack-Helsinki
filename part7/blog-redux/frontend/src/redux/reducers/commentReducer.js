import commentService from '../../services/comment';

const reducer = (state = [], action) => {
  if(action.type === 'CREATE_COMMENT') {
    return [...state, action.data];
  } else if (action.type === 'INIT_COMMENTS'){
    return action.data;
  }
  else {
    return state;
  }
};

export const createComment = ( id, comment ) => {
  return async dispatch => {
    const savedComment = await commentService.create(id, comment);
    dispatch({
      type: 'CREATE_COMMENT',
      data: savedComment
    });
  };
};

export const initializeComments = (comments) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments
    });
  };
};

export default reducer;
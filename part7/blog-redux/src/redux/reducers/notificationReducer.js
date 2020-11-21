const reducer = (state = '', action) => {
  if(action.type === 'NOTIFICATION') {
    return action.data;
  } else {
    return state;
  }
};

let timeoutID;

export const setNotification = (content, type, time) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        content: content,
        type: type
      }
    });

    window.clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: {
          content: ''
        }
      });
    }, time * 1000);
  };
};

export default reducer;
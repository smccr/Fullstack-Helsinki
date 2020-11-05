const reducer = (state = '', action) => {
  if(action.type === 'NOTIFICATION') {
    return action.data.content;
  } else {
    return state;
  }
}

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        content: content
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: {
          content: ''
        }
      })
    }, time * 1000);
  }
}

export default reducer;
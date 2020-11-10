const reducer = (state = '', action) => {
  if(action.type === 'NOTIFICATION') {
    return action.data.content;
  } else {
    return state;
  }
}

let timeoutID

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        content: content
      }
    })
    window.clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
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
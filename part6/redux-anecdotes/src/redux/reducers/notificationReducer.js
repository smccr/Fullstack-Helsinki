const reducer = (state = 'Initial message', action) => {
  if(action.type === 'NEW_NOTIFICATION'){
    return action.content;
  } else {
    return state;
  }

}

export const createNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      content: content
    }
  }
}

export default reducer;
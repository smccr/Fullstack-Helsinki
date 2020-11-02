const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.content;
    case 'REMOVE_NOTIFICATION':
      return action.data.content;
    default:
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

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      content: ''
    }
  }
}

export default reducer;
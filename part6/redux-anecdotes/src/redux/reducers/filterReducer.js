const reducer = (state = '', action) => {
  if (action.type === 'SET_FILTER') {
    return action.data.content;
  } else {
    return state;
  }
}

export const createFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: {
      content: content
    }
  }
}

export default reducer;
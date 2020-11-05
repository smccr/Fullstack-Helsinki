import anecdoteService from '../../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, votes: anecdoteToChange.votes + 1
      }
      return sortAnecdotes(state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote))

    case 'NEW_ANECDOTE':
      const newAnecdote = asObject(action.data.content)
      const newState = [...state, newAnecdote]
      return newState
    case 'INIT_ANECDOTES':
      return action.data.content
    default:
      break;
  }

  return state
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote
      }
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: {
        content: anecdotes
      }
    })
  }
}

const sortAnecdotes = (anecdotes) => {
  anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  return anecdotes
}

export default reducer
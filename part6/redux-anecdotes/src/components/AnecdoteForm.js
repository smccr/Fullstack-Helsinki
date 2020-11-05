import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../redux/reducers/anecdoteReducer'
import { setNotification } from '../redux/reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification('You created a new anecdote', 3))
    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default AnecdoteForm;
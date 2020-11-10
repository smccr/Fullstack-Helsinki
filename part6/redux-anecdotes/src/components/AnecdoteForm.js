import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../redux/reducers/anecdoteReducer'
import { setNotification } from '../redux/reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification('You created a new anecdote', 3)
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

const mapDispatchToProps = {
  createAnecdote: createAnecdote,
  setNotification: setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm;
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../redux/reducers/anecdoteReducer'
import { setNotification } from '../redux/reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      return filteredAnecdotes
    }

  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 3))
  }

  const sortAnecdotes = (anecdotes) => {
    anecdotes.sort((a, b) => {
      return b.votes - a.votes
    })
    return anecdotes
  }

  sortAnecdotes(anecdotes)
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;
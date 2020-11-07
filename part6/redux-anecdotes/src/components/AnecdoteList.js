import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../redux/reducers/anecdoteReducer'
import { setNotification } from '../redux/reducers/notificationReducer'

const AnecdoteList = (props) => {

  const anecdotes = () => {
    if (props.filter === '') {
      return props.anecdotes
    } else {
      const filteredAnecdotes = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
      return filteredAnecdotes
    }
  }

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 3)
  }

  const sortAnecdotes = (anecdotes) => {
    const sorted = [...anecdotes]
    sorted.sort((a, b) => {
      return b.votes - a.votes
    })
    return sorted
  }


  return (
    <div>
      {sortAnecdotes(anecdotes()).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notifications: state.notifications,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote: voteAnecdote,
  setNotification:setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList;
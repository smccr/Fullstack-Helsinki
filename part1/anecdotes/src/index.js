import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const findMaxVotes = (votes) => {
  let max = 0;
  for (let index = 0; index < votes.length; index++) {
    if (votes[index] > votes[max]) {
      max = index;
    }
  }
  return max;
}

const MaxVotes = ({anecdotes, votes}) => {
  const max = findMaxVotes(votes);
  console.log("max", max);
  return (
    <div>
      <p>{anecdotes[max]}<br />has {votes[max]} votes</p>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return(
    <button onClick = {onClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));

  const handleNext = () => {
    const random = getRandomInt(0, 6);
    console.log("random", random);
    setSelected(random);
  }

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br />
      <p>has {votes[selected]} votes</p>
      <Button onClick = {handleVote} text = {'vote'} />
      <Button onClick = {handleNext} text = {'next anecdote'} />
      <h1>Anecdote with most votes</h1>
      <MaxVotes anecdotes = {props.anecdotes} votes = {votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root')
)
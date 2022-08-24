import React,{ useState } from 'react';
import ReactDOM from 'react-dom/client';


const Button = ({ handleClick, text }) => {

  return (
    <div>
      <button onClick={handleClick}>{text}</button> 
    </div>
  )
}

const MostAnecdote = ({anecdotes, vote}) => {
  const anecdote = anecdotes[vote.indexOf(Math.max(...vote))]
  return ( <p> { anecdote } </p> )
}

const BoxVotes = ({ nvotes }) => {

  return (
    <p> has { nvotes } votes </p>
  )
}


const App = () => {  

  const titles = {
    title1: "Anecdote of the day",
    title2: "Anecdote with most votes"
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const ivotes = Array.apply(null, {length: 6}).map(function() {return 0;})
  const [votes, setVotes] = useState(ivotes)
  const [selected, setSelected] = useState(0)

  
  const handleNext = () => {    
    const randomNumber = Math.floor(Math.random() * (anecdotes.length))
    setSelected( randomNumber )    
  }

  const handleVote = () => {    
    setVotes( (votes) => votes.map((vote, idx) => vote += (idx===selected)? 1: 0)) 
  }

  const Title = ({ text }) => (
     <h2>{ text }</h2>
  )

  return (
    <div>
      <Title text={titles.title1}/>
        
      { anecdotes[selected] }

      <BoxVotes nvotes={votes[selected]} />
      
      <div className='group'>
        <Button handleClick={handleVote} text="vote"/>
        <Button handleClick={handleNext} text="next anecdote"/>
      </div>
      <Title text={titles.title2}/>             
      <MostAnecdote anecdotes={anecdotes} vote={votes}/>
      <BoxVotes nvotes={Math.max( ...votes )}/>      

    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root'))
.render(<App />);



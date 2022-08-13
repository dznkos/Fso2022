
import './App.css';

import { useState } from 'react';


const Statistic = ({text, value, sign}) => {
  return (  
    <tr>
      <td> {text} </td>
      <td> {value} {sign} </td>
    </tr>
    )
}

const Button = ({handleClick,text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const all = (good + neutral + bad);
  const average = (good-bad)/all;
  const positive =  (good / all)*100;

  if(all === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }

  return (
    <div>
      <h2>My Statistics</h2>
      <table>
      <Statistic text="good" value={good}  ></Statistic>
      <Statistic text="neutral" value={neutral}  ></Statistic>
      <Statistic text="bad" value={bad}  ></Statistic>

      <Statistic text="all" value={all}  ></Statistic>
      <Statistic text="average" value={average}  ></Statistic>
      <Statistic text="positive" value={positive} sign="%" ></Statistic>
      </table>
    </div>
  )

}
 

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood( good + 1 )
  }
  const handleNeutral = () => {
    setNeutral( neutral + 1 )
  }
  const handleBad = () => {
    setBad( bad + 1 )
  }


  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={()=> handleGood()} text="good" ></Button>
      <Button handleClick={()=> handleNeutral()} text="neutral"></Button>
      <Button handleClick={()=> handleBad()} text="bad"></Button>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;

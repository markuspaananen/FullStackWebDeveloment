import { useState } from 'react'
// a proper place to define a component
const StatisticLine = ({ text, value }) => {
  if (text === "positive"){
    return (
      <div>
          {text} {value} %
        </div>
    );
  }
  return (
      <div>
        {text} {value}
      </div>
  );
}
const Statistics = ({ good, bad, neutral }) => {
  //for getting average between 1 and -1
  let array = []
  for (let i = 0; i < good; i++) {
    array.push(+1);
  }
  for (let o = 0; o < neutral; o++) {
    array.push(+0);
  }
  for (let u = 0; u < bad; u++) {
    array.push(-1);
  }
  let val = 0
  let totalAverage = 0
  for (let y = 0; y < array.length; y++) {
    val = val + array[y]
    totalAverage = val / array.length
  }
  let average = totalAverage;
  let positive = (((100 * (good)) / (good + neutral + bad)));
  let all = (good + neutral + bad);
  if (all === 0) {
    return (
      <table>
        <thead>
          <tr>
            <td><h1>statistics</h1></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>No feedback given</th>
          </tr>
        </tbody>

      </table>
    )
  }
  else {
    return (
      <table>
        <thead>
          <tr>
            <td><h1>statistics</h1></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><StatisticLine text="good" value={good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" value={neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" value={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" value={all} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" value={average} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" value={positive} /></td>
          </tr>
        </tbody>
      </table>
    )
  }
}
//Button
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
function App() {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}
export default App
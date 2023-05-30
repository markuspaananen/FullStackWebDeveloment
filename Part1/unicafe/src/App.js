import { useState } from 'react'
// a proper place to define a component

const StatisticLine = ({ text, value }) => {

  return (
    <div>
      <div>
        {text} {value}
      </div>
    </div>
  );
}

const Statistics = ({ good, bad, neutral }) => {
  //...

  let all = (good + neutral + bad);
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

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>

        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </div>
    )
  }

}
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
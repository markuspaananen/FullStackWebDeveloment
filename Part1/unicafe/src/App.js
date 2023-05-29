import { useState } from 'react'

// a proper place to define a component
const Statistics = ({good,bad,neutral}) => {
  //...
  let all = (good + neutral + bad);
  let average = ((good + neutral + bad) / 3);
  let positive = ((100 * (good)) / (good + neutral + bad));

  return(
    <div>
      <div>
        all {all}
      </div>
      <div>
        average {average}
      </div>
      <div>
        positive {positive}
      </div>
    </div>
  )
}

function App() {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <h1>statistics</h1>
      <div>
        good {good}
      </div>
      <div>
        neutral {neutral}
      </div>
      <div>
        bad {bad}
      </div>
      <div>
        <Statistics good={good} bad={bad} neutral={neutral}/>
      </div>
    </div>
  )
}

export default App
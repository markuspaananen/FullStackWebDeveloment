const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <div>
    {parts.map(parts =>
      <div key={parts.id} >
        <p>
          {parts.name}
        </p>
      </div>
    )}
  </div>
  
const Course = (props) => {
  return (
    <div>
      <header>
        <Header course={props.course.name} />
      </header>
      <div>
        <Content parts={props.course.parts} />
      </div>
    </div>
  );
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return <Course course={course} />
}

export default App
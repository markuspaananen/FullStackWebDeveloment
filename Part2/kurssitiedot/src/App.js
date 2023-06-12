const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  const totalExercises =
    parts.reduce(function (sum, part) {
      return sum + part.exercises;
    }, 0);
  return (
    <div>
      <p>Total of {totalExercises} exercises</p>
    </div>
  );
};
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);
const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <header>
        <Header course={course.name} />
      </header>
      <div>
        <Content parts={course.parts} />
      </div>
      <div>
        <Total parts={course.parts} />
      </div>
    </div>
  );
};
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}
export default App
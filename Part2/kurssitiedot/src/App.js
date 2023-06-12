const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  const totalExercises =
    parts.reduce((sum, part) => sum + part.exercises, 0);
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
const Course = ({ course }) => {
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
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App
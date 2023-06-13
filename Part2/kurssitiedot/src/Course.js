

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

export function Course({ course }) {
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
}


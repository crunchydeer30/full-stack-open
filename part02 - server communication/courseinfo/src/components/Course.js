import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <article>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </article>
  );
};

export default Course;

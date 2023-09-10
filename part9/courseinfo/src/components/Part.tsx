import { CoursePart, PartProps } from '../types';
import { asserNever } from '../utils';

const renderCourseDetails = (coursePart: CoursePart) => {
  switch (coursePart.kind) {
    case 'basic':
      return <p>{coursePart.description}</p>;
    case 'group':
      return <p>project excercises {coursePart.groupProjectCount}</p>;
    case 'background':
      return (
        <>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.backgroundMaterial}</p>
        </>
      );
    case 'special':
      return (
        <>
          <p>{coursePart.description}</p>
          <p>
            required skills:{' '}
            {coursePart.requirements.map(
              (r, idx) =>
                r + (idx !== coursePart.requirements.length - 1 ? ', ' : '')
            )}
          </p>
        </>
      );
    default:
      return asserNever(coursePart);
  }
};

const Part = (props: PartProps) => {
  return (
    <div>
      <p>
        {props.coursePart.name} {props.coursePart.exerciseCount}
      </p>
      {renderCourseDetails(props.coursePart)}
    </div>
  );
};

export default Part;

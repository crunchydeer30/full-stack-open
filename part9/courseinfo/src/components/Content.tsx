import { ContentProps } from '../types';
import Part from './Part';

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((coursePart) => (
        <Part coursePart={coursePart} key={coursePart.name} />
      ))}
    </>
  );
};

export default Content;

import { useState } from 'react';

const Toggleagble = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibilty = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibilty}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibilty}>Cancel</button>
      </div>
    </>
  );
};

export default Toggleagble;

import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';
import { useState } from 'react';

const Filter = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const query = event.currentTarget.value;
    setFilter(query);
    dispatch(filterChange(query));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;

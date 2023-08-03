import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries';
import { useNotify } from '../NotificationContext';

const EditAuthorForm = () => {
  const notify = useNotify();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const [editBirthyear, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    editBirthyear({ variables: { name, setBornTo: year } });
    setName('');
    setYear('');
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notify('person not found');
    }
  }, [result.data]); // eslint-disable-line

  return (
    <section>
      <h2>Edit Author</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Year'
            value={year}
            onChange={(e) => setYear(+e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default EditAuthorForm;

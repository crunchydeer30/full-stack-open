import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries';
import { useNotify } from '../NotificationContext';

const EditAuthorForm = ({ authors }) => {
  const notify = useNotify();
  const [year, setYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  const [editBirthyear, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    editBirthyear({ variables: { name: selectedAuthor.value, setBornTo: year } });
    setSelectedAuthor(null);
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
        <Select
          defaultValue={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
        />
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

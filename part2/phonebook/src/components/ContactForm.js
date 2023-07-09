const ContactForm = ({ handleSubmit, name, setName, number, setNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name: </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='name'
          id='name'
          placeholder='Name'
          maxLength={20}
          required
        />
      </div>
      <div>
        <label htmlFor='number'>Number: </label>
        <input
          type='tel'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          name='number'
          id='number'
          placeholder='Number'
          maxLength={20}
          required
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default ContactForm;

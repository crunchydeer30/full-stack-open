import { useState } from 'react';
import Contacts from './components/Contacts';
import ContactForm from './components/ContactForm';
import Heading from './components/Heading';
import Filter from './components/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');
  const contactsToShow = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = (event) => {
    event.preventDefault();

    if (!validateInput(newName) || !validateInput(newNumber)) {
      alert(
        'Name and number must not be empty and be no longer than 20 characters'
      );
      return;
    }

    if (contacts.find((contact) => contact.name === newName)) {
      alert(`${newName} already exists in the phonebook!`);
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber,
    };

    setContacts(contacts.concat(newContact));
    setNewName('');
    setNewNumber('');
  };

  const validateInput = (input) => {
    return input.length > 0 && input.length < 20;
  };

  return (
    <div>
      <Heading text='Phonebook' />
      <section>
        <Filter filter={filter} setFilter={setFilter} />
      </section>
      <section>
        <Heading text='Add contact' />
        <ContactForm
          handleSubmit={addContact}
          name={newName}
          setName={setNewName}
          number={newNumber}
          setNumber={setNewNumber}
        />
      </section>
      <section>
        <Heading text='Contacts' />
        <Contacts contacts={contactsToShow} />
      </section>
    </div>
  );
};

export default App;

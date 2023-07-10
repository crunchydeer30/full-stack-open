import axios from 'axios';
import { useState, useEffect } from 'react';
import contactService from './services/contacts.js';

import Contacts from './components/Contacts';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import Heading from './components/Heading';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');
  const contactsToShow = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => setContacts(initialContacts));
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    const existingContact = contacts.find(
      (contact) => contact.name === newName
    );

    if (existingContact) {
      return updateContact(existingContact);
    }

    const newContact = {
      name: newName,
      number: newNumber,
    };

    contactService
      .create(newContact)
      .then((returnedContact) => {
        setContacts(contacts.concat(returnedContact));
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        alert(`Error occured`);
      });
  };

  const updateContact = (contact) => {
    const confirmation = window.confirm(
      `'${contact.name}' already exists, replace old number with a new one?`
    );

    if (!confirmation) return;

    const id = contact.id;
    const changedContact = { ...contact, number: newNumber };

    contactService
      .editNumber(id, changedContact)
      .then((returnedContact) => {
        setContacts(
          contacts.map((contact) =>
            contact.id !== id ? contact : returnedContact
          )
        );

        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        alert(`Error occured`);
      });
  };

  const removeContact = (id) => {
    const removedContact = contacts.find((contact) => contact.id === id);

    const confirmation = window.confirm(`Remove '${removedContact.name}'?`);
    if (!confirmation) return;

    contactService
      .remove(id)
      .then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
      })
      .catch((error) => {
        alert(`Error occured`);
      });
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
        <Contacts contacts={contactsToShow} removeContact={removeContact} />
      </section>
    </div>
  );
};

export default App;

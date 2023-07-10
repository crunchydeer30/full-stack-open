import ContactItem from './ContactItem';

const Contacts = ({ contacts, removeContact }) => {
  return (
    <>
      {contacts.length > 0 ? (
        <table>
          <tbody>
            {contacts.map((contact) => (
              <ContactItem
                name={contact.name}
                number={contact.number}
                key={contact.name}
                removeContact={() => {
                  removeContact(contact.id);
                }}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts</p>
      )}
    </>
  );
};

export default Contacts;

const ContactItem = ({ name, number, removeContact }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button onClick={removeContact}>Remove</button>
      </td>
    </tr>
  );
};

export default ContactItem;

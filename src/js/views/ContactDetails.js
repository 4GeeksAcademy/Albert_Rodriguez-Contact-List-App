import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const ContactDetails = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const foundContact = store.contacts.find((c) => c.id.toString() === id);
    if (foundContact) {
      setContact({
        name: foundContact.full_name,
        phone: foundContact.phone,
        email: foundContact.email,
        address: foundContact.address,
      });
    }
  }, [id, store.contacts]);

  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const saveContact = () => {
    actions.editContact(
      id,
      contact.name,
      contact.phone,
      contact.email,
      contact.address
    );
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleInputChange}
        />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={contact.phone}
          onChange={handleInputChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleInputChange}
        />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={contact.address}
          onChange={handleInputChange}
        />
        <button onClick={saveContact}>Save Changes</button>
        <button onClick={() => actions.deleteContact(id)}>Delete</button>
      </div>
    </div>
  );
};

export default ContactDetails;

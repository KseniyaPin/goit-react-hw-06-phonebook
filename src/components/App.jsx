import React, { useState, useEffect } from 'react';

import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './Form/Form.module.css';

// Отримуємо із локального сховища масив обєктів
//Обов'язово перевіряємо if чи є там дані, щоб не було значення null
const getContacts = () => {
  if (localStorage.getItem('arrContacts')) {
    return JSON.parse(localStorage.getItem('arrContacts'));
  }
  return [];
};

export default function App() {
  const [contacts, setContacts] = useState(getContacts);
  const [filter, setFilter] = useState('');

  //Виклик тільки при зміні [contacts]
  useEffect(() => {
    window.localStorage.setItem('arrContacts', JSON.stringify(contacts));
  }, [contacts]);

  function handleAddContact(newContact) {
    if (contacts !== []) {
      // Пошук елемента по унікальному значенню name в масиві сontacts
      if (
        contacts.find(
          option => option.name.toLowerCase() === newContact.name.toLowerCase()
        )
      ) {
        alert(`${newContact.name} is already in contacts.`);
        return;
      }
    }

    //Додаємо в масив контактів нове значення
    setContacts(prevContact => [...prevContact, newContact]);
  }

  // Фільтруємо дані у полі пошука
  const handleSearch = evt => setFilter(evt.currentTarget.value);

  const filterContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  // Для видалення контакту, фільтруємо його по id
  const handleDeleteContact = evt => {
    setContacts(
      contacts.filter(contact => contact.id !== evt.currentTarget.id)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={handleAddContact} />

      <h2>Contacts</h2>
      <section className={css.sectionStyle}>
        <Filter onSearch={handleSearch} value={filter} />
        <ContactList
          contacts={filterContacts}
          value={filter}
          onDelete={handleDeleteContact}
        />
      </section>
    </div>
  );
}

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import useLocalStorage from '../hooks/useLocalStorage';

export function Form({ onSubmit }) {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');

  const handleInputChange = evt => {
    // evt.preventDefault();
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  function btnClickAddContact(evt) {
    evt.preventDefault();
    //Якщо обидва Інпути заповнені
    if (!name || !number) {
      return;
    }

    //Записуємо новий контакт
    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };
    console.log('newContact=', newContact);

    onSubmit(newContact);

    // Видаляємо із Input поточні дані, очищуємо після Submit
    setName('');
    setNumber('');
  }

  return (
    <form>
      <label>
        Name
        <input
          type="text"
          onChange={handleInputChange}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          onChange={handleInputChange}
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button
        type="submit"
        onClick={btnClickAddContact}
      >
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  onChange: PropTypes.func,
};

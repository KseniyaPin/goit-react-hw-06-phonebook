import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteContact } from 'components/redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();

  // Получаем массив Контактов и Фильтр из состояния Redux
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);

  // Вычисляем массив задач которые необходимо отображать в интерфейсе
  const visibleContacts = selectVisibleContacts(contacts);

  function selectVisibleContacts(contacts) {
    return contacts
      ? contacts.filter(contact => {
          const contactName = contact.name
            ? contact.name.toLowerCase().includes(filter.toLowerCase())
            : '';
          return contactName;
        })
      : [];
  }

  const handlDeleteContact = evt => {
    dispatch(deleteContact(evt.currentTarget.id));
  };

  return (
    <>
      <ul>
        {visibleContacts.map(({ name, number, id }) => {
          return (
            <li key={id} id={id} onClick={handlDeleteContact}>
              {name}: {number}
              <button type="button">Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};

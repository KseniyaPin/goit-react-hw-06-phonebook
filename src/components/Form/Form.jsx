import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'components/redux/contactsSlice';
import css from './Form.module.css';

export const Form = () => {
  const contacts = useSelector(state => state.contacts);

  // Получаем ссылку на функцию отправки экшенов
  const dispatch = useDispatch();

  const btnClickAddContact = evt => {
    evt.preventDefault();

    const { name, number } = evt.target;
    const nameInput = name.value.trim();
    const numberInput = number.value.trim();

    //Якщо обидва Інпути заповнені
    if (!nameInput || !numberInput) {
      return;
    }

    if (nameInput !== '') {
      // Пошук елемента по унікальному значенню name в масиві сontacts
      if (
        contacts.find(option =>
          option.name
            ? option.name.toLowerCase() === nameInput.toLowerCase()
            : ''
        )
      ) {
        alert(`${nameInput} is already in contacts.`);
        name.value = '';
        number.value = '';
        return;
      }
    }
    
    // Отправляем результат - экшен создания задачи
    // Вызываем генератор экшена и передаем текст задачи для поля payload
    dispatch(addContact(nameInput, numberInput));
    
    name.value = '';
    number.value = '';
  };

  return (
    <form onSubmit={btnClickAddContact} className={css.form}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters. For example Adrian de Castelmore"
          required
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};

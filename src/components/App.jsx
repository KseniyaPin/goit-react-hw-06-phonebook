import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './Form/Form.module.css';

export default function App() {
  return (
    <div>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <section className={css.sectionStyle}>
        <Filter />
        <ContactList />
      </section>
    </div>
  );
}

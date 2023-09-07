import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { filterContacts } from 'components/redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  return (
    <label>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={evt => dispatch(filterContacts(evt.currentTarget.value))}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

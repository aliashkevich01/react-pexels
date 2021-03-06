import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces/StateInterface';
import { SearchByQueryAction } from '../../redux/actions/actions';
import classes from './SearchBar.module.css';

export default function SearchBar() {
  const intl = useIntl();
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  const [query, setQuery] = useState(data.photo.query ? data.photo.query : 'nature');
  const search = () => {
    if (query) {
      dispatch(SearchByQueryAction(data, query));
    } else {
      alert('No query parameter!');
    }
  };
  return (
    <div className={classes.search_bar}>
      <input
        className={classes.search_input}
        type="text"
        placeholder={intl.formatMessage({ id: 'search_placeholder' })}
        maxLength={20}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={window.location.pathname === '/categories' ? (query ? query : 'nature') : ''}
      />
      <button className={classes.search_button} onClick={search}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#7f7f7f"
          className={classes.svg}
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </button>
    </div>
  );
}

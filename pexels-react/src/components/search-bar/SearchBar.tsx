import { ChangeEvent, ChangeEventHandler } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces/StateInterface';
import { LOAD_PHOTOS } from '../../redux/reducers/photo/actions';
import classes from './SearchBar.module.css';

export default function SearchBar() {
  const intl = useIntl();
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  const search:ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    sessionStorage.removeItem('query');
    dispatch({
      type: LOAD_PHOTOS,
      payload: {
        query: (e.target as HTMLInputElement).value,
        page: 1,
      }
    });
  }
  return (
    <div className={classes.search_bar}>
      <input className={classes.search_input} 
      type="text"
      placeholder={intl.formatMessage({id: 'search_placeholder'})}
      onChange={search}
      maxLength={20}
      defaultValue={window.location.pathname === '/categories'? (sessionStorage.getItem('query') !== '' ? 
      intl.formatMessage({
        id: JSON.stringify(sessionStorage.getItem('query')).substring(1, JSON.stringify(sessionStorage.getItem('query')).length - 1)
      }):  intl.formatMessage({
        id: data.photo.query,
      })) : ''}
      />
      <button className={classes.search_button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </button>
    </div>
  );
}

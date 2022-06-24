import classes from './header.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/SearchBar';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces/StateInterface';
import { stateInterface } from '../../redux/reducers/photo';
import { LOCALES } from '../../i18n/locales';
import { ChangeLocaleAction } from '../../redux/actions/actions';
import { Redirect } from 'react-router';

const Header = (props: { className?: string }) => {
  const data: stateInterface = useSelector((state: StateInterface) => state.photo);
  const dispatch = useDispatch();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const changeLanguage = () => {
    const switchedLanguage = data.locale === LOCALES.ENGLISH ? LOCALES.RUSSIAN : LOCALES.ENGLISH;
    dispatch(ChangeLocaleAction(data, switchedLanguage));
  };
  return (
    <header className={`${props.className} ${classes.header}`}>
      <a href="/" className={classes.header_title}>
        Pexels
      </a>
      <SearchBar />
      <section>
        <button
          className={classes.hamburger}
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <ul className={isNavExpanded ? classes.header_list_is_open : classes.header_list}>
          <li className={classes.header_item}>
            <Link
              to="/"
              className={classes.categories_link}
              onClick={() => {
                sessionStorage.removeItem('query');
                <Redirect to={'/'} />;
              }}
            >
              <FormattedMessage id="main_route" />
            </Link>
          </li>
          <li className={classes.header_item}>
            <Link
              to="/categories"
              className={classes.categories_link}
              onClick={() => {
                <Redirect to={'/categories'} />;
              }}
            >
              <FormattedMessage id="categories_route" />
            </Link>
          </li>
          <li className={classes.header_item}>
            <p className={classes.switcher} onClick={changeLanguage}>
              <FormattedMessage id="change" />
            </p>
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Header;

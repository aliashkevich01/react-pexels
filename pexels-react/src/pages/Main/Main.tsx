import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Author from '../../components/author/Author';
import CategoryLink from '../../components/categories-links/CategoryLink';
import Header from '../../components/header/Header';
import SearchBar from '../../components/search-bar/SearchBar';
import { StateInterface } from '../../interfaces/StateInterface';
import { searchByMainAction } from '../../redux/actions/actions';
import classes from './Main.module.css';
import CardList from '../../components/card-list/CardList';
import { FormattedMessage } from 'react-intl';

export default function Main() {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  const isBackLoading = data.photo.backPhoto.isLoading;
  const backUrl = data.photo.backPhoto.src?.large;

  const scrollHandler = (e: Event) => {
    const header = document.getElementsByTagName('header');
    const searchBar = header[0].getElementsByTagName('div') as HTMLCollection;
    if (window.pageYOffset > 25) {
      header[0].style.background = '#232a34';
      (searchBar[0] as HTMLDivElement).style.display = 'flex';
      (searchBar[0] as HTMLDivElement).style.marginBottom = '20px';
    } else {
      header[0].style.background = 'transparent';
      (searchBar[0] as HTMLDivElement).style.display = 'none';
    }
    if (
      (e.target as Document).documentElement.scrollHeight -
        ((e.target as Document).documentElement.scrollTop + window.innerHeight) <
      10
    ) {
      dispatch(searchByMainAction(data, data.photo.query, data.photo.page));
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });
  return (
    <Fragment>
      <div
        className={classes.main_container}
        style={
          isBackLoading
            ? { background: `url('../../assets/pexels-photo-2880507.jpeg') center/cover no-repeat` }
            : { background: `url(${backUrl}) top/cover no-repeat` }
        }
      >
        <Header />
        <div className={classes.search_wrapper}>
          <h1 className={classes.main_title}>
            <FormattedMessage id="main_header" />
          </h1>
          <SearchBar />
          <CategoryLink />
        </div>
        <div className={classes.author_link}>
          <Author
            photographer="Deden Dicky Ramdhani"
            photographer_url="https://www.pexels.com/@drdeden88"
          />
        </div>
      </div>
      <CardList />
    </Fragment>
  );
}

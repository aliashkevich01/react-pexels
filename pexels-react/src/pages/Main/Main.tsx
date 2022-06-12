/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Author from '../../components/author/Author';
import CategoryLink from '../../components/categories-links/CategoryLink';
import Header from '../../components/header/Header';
import SearchBar from '../../components/search-bar/SearchBar';
import { StateInterface } from '../../interfaces/StateInterface';
import { LOAD_PHOTOS } from '../../redux/reducers/photo/actions';
import classes from './Main.module.css';
import CardList from '../../components/card-list/CardList';
import { FormattedMessage } from 'react-intl';

export default function Main() {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  let backUrl = 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg';
  const keys = Object.keys(data.photo.backPhoto);
  if (keys.includes('src')) {
    backUrl = data.photo.backPhoto.src.landscape;
  }
  const backStyle = {
    background: `url(${backUrl}) top/cover no-repeat`,
  };
  const scrollHandler = (e: Event) => {
    const header = document.getElementsByTagName('header');
    const searchBar = header[0].getElementsByTagName('div') as HTMLCollection;
    if (window.pageYOffset > 250) {
      header[0].style.background = '#232a34';
      header[0].style.paddingTop = '0';
      (searchBar[0] as HTMLDivElement).style.display = 'block';
    } else {
      header[0].style.background = 'transparent';
      (searchBar[0] as HTMLDivElement).style.display = 'none';
    }
    if (
      (e.target as Document).documentElement.scrollHeight -
        ((e.target as Document).documentElement.scrollTop + window.innerHeight) <
      10
    ) {
      dispatch({
        type: LOAD_PHOTOS,
        payload: {
          query: data.photo.query,
          page: data.photo.page + 1,
        },
      });
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [data.photo.isLoading, scrollHandler]);
  return (
    <Fragment>
      <div className={classes.main_container} style={backStyle}>
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

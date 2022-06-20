/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../../components/card-list/CardList';
import Filter from '../../components/filter/Filter';
import Header from '../../components/header/Header';
import { SIZES, COLORS, ORIENTATION } from '../../constants';
import { StateInterface } from '../../interfaces/StateInterface';
import { searchByCategoriesScroll } from '../../redux/reducers/photo/actions';
import classes from './categories.module.css';

const Categories = () => {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  const { query, page, orientation, size, color } = data.photo;
  const scrollHandler = (e: Event) => {
    if (
      (e.target as Document).documentElement.scrollHeight -
        ((e.target as Document).documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(searchByCategoriesScroll(query, page, orientation, size, color));
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
      <Header className={classes.categories_header} />
      <nav className={classes.filters_nav}>
        <Filter filter_type="orientation" filter_values={ORIENTATION} />
        <Filter filter_type="size" filter_values={SIZES} />
        <Filter filter_type="color" filter_values={COLORS} />
      </nav>
      <CardList />
    </Fragment>
  );
};
export default Categories;

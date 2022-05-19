/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/card-list/CardList";
import Filter from "../../components/filter/Filter";
import Header from "../../components/header/Header";
import { StateInterface } from "../../interfaces/StateInterface";
import { LOAD_PHOTOS } from "../../redux/reducers/photo/actions";
import { COLORS, ORIENTATION as ORIENTATIONS, SIZES } from "../../redux/utils";
import classes from './categories.module.css'

const Categories = () => {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  const scrollHandler = (e: Event) => {
    if((e.target as Document).documentElement.scrollHeight - ((e.target as Document).documentElement.scrollTop + window.innerHeight) < 100){
      dispatch({
        type: LOAD_PHOTOS,
        payload: {
          query: data.photo.query,
          page: data.photo.page + 1,
          orientation: data.photo.orientation,
          size: data.photo.size,
          color: data.photo.color,
        }
      });
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function() {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [data.photo.isLoading, scrollHandler]);
  return (
    <div>
      <Header className={classes.categories_header}></Header>
      <nav className={classes.filters_nav}>
      <Filter filter_type="orientation" filter_values={ORIENTATIONS} />
      <Filter filter_type="size" filter_values={SIZES} />
      <Filter filter_type="color" filter_values={COLORS} />
      </nav>
      <CardList />
    </div>
  )
}
export default Categories;
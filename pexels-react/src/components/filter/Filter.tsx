import { ChangeEvent, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { FilterInterface, filterTranslateInterface } from '../../interfaces/FilterInterface'
import { StateInterface } from '../../interfaces/StateInterface';
import { LOAD_PHOTOS } from '../../redux/reducers/photo/actions';
import classes from './filter.module.css'

export default function Filter(props: FilterInterface) {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  const f = props.filter_type;
  const filterTranslations: Array<filterTranslateInterface> = [];
  props.filter_values.forEach((filter, idx) => {
    filterTranslations.push({
      key:filter,
      value:filter,
      id:idx,
    });
  })
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switch(f) {
      case 'size': {
        dispatch({
          type: LOAD_PHOTOS,
          payload: {
            query: data.photo.query,
            page: 1,
            orientation: data.photo.orientation,
            size: e.target.value,
            color: data.photo.color
          }
        })
        break;
      }
      case 'orientation': {
        dispatch({
          type: LOAD_PHOTOS,
          payload: {
            query: data.photo.query,
            page: 1,
            orientation: e.target.value,
            size: data.photo.size,
            color: data.photo.color
          }
        })
        break;
      }
      case 'color': {
        dispatch({
          type: LOAD_PHOTOS,
          payload: {
            query: data.photo.query,
            page: 1,
            color: e.target.value,
            size: data.photo.size,
            orientation: data.photo.orientation
          }
        })
        break;
      }
    }
  }
  return (
    <div className={classes.select_wrapper}>
      <select onChange={handleChange} tabIndex={0}>
       {filterTranslations.map((item) => {
         return <option key={item.id} value={item.key}>{item.id !== 0 ? <FormattedMessage id={item.key}/>: <FormattedMessage id={item.value}/>}</option>
       })} 
    </select>
    <div className="select-arrow"></div>
    <div className="select-arrow"></div>
    </div>
  )
}
//{props.filter_values.map((item, idx) => {
//  return <option key={idx} value={item}>{idx !== 0 ? item : props.filter_type + `: any`}</option>
//})}
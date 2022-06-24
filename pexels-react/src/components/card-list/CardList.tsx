import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ColumnInterface } from '../../interfaces/ColumnInterface';
import { StateInterface } from '../../interfaces/StateInterface';
import Preloader from '../preloader/Preloader';
import Card from './card/Card';
import classes from './CardList.module.css';

export default function CardList() {
  const columns = 3;
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const columnWrapper: ColumnInterface = {
    column0: [],
    column1: [],
    column2: [],
  };
  const result = [];
  for (let i = 0; i < data.photo.data.photos.length; i++) {
    const columnIndex = i % columns;
    if (columnIndex === 0) {
      columnWrapper[`column0`].push(<Card photo={data.photo.data.photos[i]} />);
    } else if (columnIndex === 1) {
      columnWrapper[`column1`].push(<Card photo={data.photo.data.photos[i]} />);
    } else {
      columnWrapper[`column2`].push(<Card photo={data.photo.data.photos[i]} />);
    }
  }
  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        style={{
          marginLeft: `${i > 0 ? '10' : 0}px`,
          flex: 1,
        }}
      >
        {i === 0 || i === 1
          ? i === 0
            ? columnWrapper[`column0`]
            : columnWrapper[`column1`]
          : columnWrapper[`column2`]}
      </div>
    );
  }
  console.log(result);
  return (
    <div className={classes.card_list} id="card-list">
      {data?.photo?.isLoading ? (
        data.photo.data?.photos?.length == 0 ? (
          <Preloader />
        ) : (
          <Fragment>
            {result}
            <Preloader />
          </Fragment>
        )
      ) : data.photo.data?.photos?.length > 0 ? (
        result
      ) : (
        <Fragment />
      )}
    </div>
  );
}

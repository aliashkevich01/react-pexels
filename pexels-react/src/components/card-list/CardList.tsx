import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { PhotoInterface } from '../../interfaces/PhotoInterface';
import { StateInterface } from '../../interfaces/StateInterface';
import Preloader from '../preloader/Preloader';
import Card from './card/Card';
import classes from './CardList.module.css';

export default function CardList() {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const CardMap = (items: Array<PhotoInterface>) => {
    return items.map((photo: PhotoInterface) => {
      return <Card key={photo.id} photo={photo} />;
    });
  };
  return (
    <div className={classes.card_list} id="card-list">
      {data?.photo?.isLoading ? (
        data.photo.data?.photos?.length == 0 ? (
          <Preloader />
        ) : (
          <Fragment>
            {CardMap(data.photo.data?.photos)}
            <Preloader />
          </Fragment>
        )
      ) : data.photo.data?.photos?.length > 0 ? (
        CardMap(data.photo.data?.photos)
      ) : (
        <Fragment />
      )}
    </div>
  );
}

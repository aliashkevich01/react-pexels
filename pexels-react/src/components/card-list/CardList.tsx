import { useSelector } from 'react-redux';
import { PhotoInterface } from '../../interfaces/PhotoInterface';
import { StateInterface } from '../../interfaces/StateInterface';
import Preloader from '../preloader/Preloader';
import Card from './card/Card';
import classes from './CardList.module.css';

export default function CardList() {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  return (
    <div className={classes.card_list}>
        {data?.photo?.isLoading ? <Preloader /> : data.photo.data?.photos?.map((photo: PhotoInterface, index: number) => {
          return <Card key={index} photo={photo} />
        })}
      </div>
  );
}

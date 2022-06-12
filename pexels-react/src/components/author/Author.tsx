import { PhotographerInterface } from '../../interfaces/PhotographerInterface';
import classes from './author.module.css';

const Author = (props: PhotographerInterface) => {
  return (
    <a
      className={classes.author__link}
      href={props.photographer_url}
      target="_blank"
      rel="noreferrer"
    >
      {props.photographer}
    </a>
  );
};

export default Author;

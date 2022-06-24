import { useState } from 'react';
import { CardPropsInterface } from '../../../interfaces/CardPropsInterface';
import Author from '../../author/Author';
import classes from './card.module.css';

export default function Card(props: CardPropsInterface) {
  const [isLiked, setIsLiked] = useState(
    localStorage.liked_photos.includes(props.photo.id) ? true : false
  );
  const download = async () => {
    const resp = await fetch(props.photo.src.large, {
      headers: {
        'Content-Disposition': 'attachment',
        filename: 'filename.jpg',
      },
    });
    const img = await resp.blob();
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(img));
    link.download = props.photo.alt;
    link.click();
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    const likedPhotos: Array<number> = JSON.parse(localStorage.liked_photos);
    if (!likedPhotos.includes(props.photo.id)) {
      likedPhotos.push(props.photo.id);
    } else {
      likedPhotos.filter((id: number) => id != props.photo.id);
    }
    localStorage.liked_photos = String(JSON.stringify(likedPhotos));
  };
  return (
    <div className={classes.card_wrap}>
      <img
        src={props.photo.src.tiny}
        style={{ height: `calc(280px + ${props.photo.id % 2 ? 0 : 50}px)` }}
      ></img>
      <div className={classes.card_bar}>
        <div>
          <Author
            photographer={props.photo.photographer}
            photographer_url={props.photo.photographer_url}
          ></Author>
        </div>
        <div className={classes.buttons}>
          <div className={classes.download_button}>
            <button className={classes.download_btn} tabIndex={0} onClick={download}>
              <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.29289 18.7071C9.68342 19.0976 10.3166 19.0976 10.7071 18.7071L17.0711 12.3431C17.4616 11.9526 17.4616 11.3195 17.0711 10.9289C16.6805 10.5384 16.0474 10.5384 15.6569 10.9289L10 16.5858L4.34315 10.9289C3.95262 10.5384 3.31946 10.5384 2.92893 10.9289C2.53841 11.3195 2.53841 11.9526 2.92893 12.3431L9.29289 18.7071ZM9 0L9 18H11L11 0L9 0Z"
                  fill="white"
                />
                <line y1="23" x2="20" y2="23" stroke="white" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className={classes.like_button}>
            <button tabIndex={0} className={classes.like_btn} onClick={handleLike}>
              {isLiked ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.8 19.3846L12 24L2.4 14.7692L0.8 12L0 9.23077V8.30769V5.53846L1.6 1.84615L4.8 0H8.8L12 3.69231L13.6 0.923077L16 0H19.2L21.6 0.923077L24 5.53846V6.46154V7.38462L23.2 12L21.6 14.7692L16.8 19.3846Z"
                    fill="#FF0000"
                  />
                </svg>
              ) : (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8 20.3846L13 25L3.4 15.7692L1.8 13L1 10.2308V9.30769V6.53846L2.6 2.84615L5.8 1H9.8L13 4.69231L14.6 1.92308L17 1H20.2L22.6 1.92308L25 6.53846V7.46154V8.38462L24.2 13L22.6 15.7692L17.8 20.3846Z"
                    stroke="white"
                    strokeWidth={2}
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//<img src={props.photo.src.tiny} className={classes.card_img} alt="Card content"></img>

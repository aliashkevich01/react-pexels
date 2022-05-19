import { useEffect, useState } from 'react';
import { CardPropsInterface } from '../../../interfaces/CardPropsInterface';
import Author from '../../author/Author';
import classes from './card.module.css';

export default function Card(props: CardPropsInterface) {
  let [isLiked, setIsLiked] = useState(localStorage.liked_photos.includes(props.photo.id) ? true : false)
  const blob = new Blob([`${props.photo.url}`], {type: 'image/jpeg'});
  const href = URL.createObjectURL(blob);
  const removeLike = (idx: number) => {
    const likedPhotos = localStorage.liked_photos.split(',');
    likedPhotos.filter((id: number) => id !== idx);
    localStorage.liked_photos = likedPhotos;
  }
  const addLike = (idx: number) => {
    const likedPhotos = localStorage.liked_photos.split(',');
    if(!likedPhotos.includes(idx)){
      likedPhotos.push(idx);
    }
    localStorage.liked_photos = likedPhotos;
  }
  const handleLike = () => {
    setIsLiked(!isLiked);
    isLiked ? removeLike(props.photo.id) : addLike(props.photo.id);
  };
  useEffect(() =>{

  }, [isLiked])
  return (
    <div className={classes.card_wrap}>
      <img
        className={classes.card_img}
        src={props.photo.src.tiny}
        alt="some content"
      ></img>
      <div className={classes.card_bar}>
        <Author
          photographer={props.photo.photographer}
          photographer_url={props.photo.photographer_url}
        ></Author>
        <div className={classes.buttons}>
          <div className={classes.download_button}>
            <a className={classes.download_btn} tabIndex={0} href={href} download>
              <svg width="32" height="21" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.9393 24.0607C20.5251 24.6464 21.4749 24.6464 22.0607 24.0607L31.6066 14.5147C32.1924 13.9289 32.1924 12.9792 31.6066 12.3934C31.0208 11.8076 30.0711 11.8076 29.4853 12.3934L21 20.8787L12.5147 12.3934C11.9289 11.8076 10.9792 11.8076 10.3934 12.3934C9.80761 12.9792 9.80761 13.9289 10.3934 14.5147L19.9393 24.0607ZM19.5 0V23H22.5V0L19.5 0Z" fill="white"/>
              <line x1="1" y1="14" x2="1" y2="32" stroke="white" strokeWidth="2"/>
              <line y1="31" x2="42" y2="31" stroke="#FFFEFE" strokeWidth="2"/>
              <line x1="41" y1="14" x2="41" y2="32" stroke="white" strokeWidth="2"/>
              </svg>
            </a>
          </div>
          <div className={classes.like_button}>
          <button tabIndex={0} className={classes.like_btn} onClick={handleLike}>{isLiked ? <svg width="16" height="15" viewBox="0 0 16 15" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 11.5L7.5 14L1.5 9L0.5 7.5L0 6V5.5V4L1 2L3 1H5.5L7.5 3L8.5 1.5L10 1H12L13.5 1.5L15 4V4.5V5L14.5 7.5L13.5 9L10.5 11.5Z" stroke="black"/>
</svg>
 : <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M10.5 11.5L7.5 14L1.5 9L0.5 7.5L0 6V5.5V4L1 2L3 1H5.5L7.5 3L8.5 1.5L10 1H12L13.5 1.5L15 4V4.5V5L14.5 7.5L13.5 9L10.5 11.5Z" stroke="black"/>
 </svg>}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

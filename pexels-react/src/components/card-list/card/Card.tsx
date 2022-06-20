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
  //const back = {
  //  background: `url(${props.photo.src.original}) center/cover no-repeat`,
  //};
  return (
    <div className={classes.card_wrap}>
      <img src={props.photo.src.original}></img>
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
                className={classes.download_svg}
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect className={classes.rect} width="36" height="36" fill="#D9D9D9" />
                <path
                  d="M16.9393 25.4669C17.5251 26.0527 18.4749 26.0527 19.0607 25.4669L28.6066 15.921C29.1924 15.3352 29.1924 14.3854 28.6066 13.7996C28.0208 13.2139 27.0711 13.2139 26.4853 13.7996L18 22.2849L9.51472 13.7996C8.92893 13.2139 7.97918 13.2139 7.3934 13.7996C6.80761 14.3854 6.80761 15.3352 7.3934 15.921L16.9393 25.4669ZM16.5 5V24.4062H19.5V5H16.5Z"
                  fill="white"
                />
                <line x1="2" y1="16.8125" x2="2" y2="32" stroke="white" strokeWidth="2" />
                <line x1="1" y1="31" x2="35" y2="31" stroke="#FFFEFE" strokeWidth="2" />
                <line x1="34.381" y1="16.8125" x2="34.381" y2="32" stroke="white" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className={classes.like_button}>
            <button tabIndex={0} className={classes.like_btn} onClick={handleLike}>
              {isLiked ? (
                <svg
                  className={classes.like_svg}
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect className={classes.rect} width="36" height="36" rx="5" fill="#D9D9D9" />
                  <path
                    className={classes.like}
                    d="M18.4252 10.4163C19.4343 7.81685 21.7393 6.00054 24.4204 6.00054C28.0319 6.00054 30.633 9.3587 30.96 13.3609C30.96 13.3609 31.1365 14.3543 30.748 16.1429C30.219 18.5788 28.9755 20.7429 27.2989 22.3946L18.4252 31L9.70107 22.394C8.02454 20.7429 6.78102 18.5783 6.25201 16.1424C5.8635 14.3538 6.04 13.3603 6.04 13.3603C6.36701 9.35815 8.96806 6 12.5796 6C15.2612 6 17.4162 7.81685 18.4252 10.4163Z"
                    fill="red"
                  />
                </svg>
              ) : (
                <svg
                  className={classes.like_svg}
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect className={classes.rect} width="36" height="36" rx="5" fill="#D9D9D9" />
                  <path
                    className={classes.like}
                    d="M18.4252 10.4163C19.4343 7.81685 21.7393 6.00054 24.4204 6.00054C28.0319 6.00054 30.633 9.3587 30.96 13.3609C30.96 13.3609 31.1365 14.3543 30.748 16.1429C30.219 18.5788 28.9755 20.7429 27.2989 22.3946L18.4252 31L9.70107 22.394C8.02454 20.7429 6.78102 18.5783 6.25201 16.1424C5.8635 14.3538 6.04 13.3603 6.04 13.3603C6.36701 9.35815 8.96806 6 12.5796 6C15.2612 6 17.4162 7.81685 18.4252 10.4163Z"
                    fill="white"
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

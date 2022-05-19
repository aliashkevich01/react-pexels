import classes from './preloader.module.css'

export default function Preloader() {
  return (
    <div className={classes.container}>
    <div className={classes.circleloader}></div>
  </div>
  )
}
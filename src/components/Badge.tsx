import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    '@keyframes blinker': {
      "0%, 60%, 100%": {
        opacity: 1,
        transform: 'rotateY(0deg)'
      },
      "30%": {
        opacity: 1,
        transform: 'rotateY(90deg)'
      },
      "80%": {
        opacity: 0,
        transform: 'rotateY(0deg)'
      }
    },
    root: {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      zIndex: 5,
      width: '50px',
      height: '70px'
    },
    badgeImg: {
      width: '100%',
      height: '100%',
      animationName: '$blinker',
      animationDuration: '4s',
      animationTimingFunction: 'linear',
      animationIterationCount:'infinite',
    }
  }),
);

type Props = {
  subDomain?: string;
}

const Badge = ({subDomain}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a href='https://www.devicelist.ca/' target='_blank' rel='noreferrer'>
        <img src={require(`../assets/${subDomain}/img/footer/device-list.png`).default} alt='badge-img' className={classes.badgeImg} />
      </a>
    </div>
  )
}

export default Badge
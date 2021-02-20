import React from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    "@keyframes blinker": {
      "0%, 10%, 20%, 30%, 100%": {
        opacity: 1,
        transform: "rotateY(0deg)",
      },
      "5%, 15%": {
        opacity: 1,
        transform: "rotateY(90deg)",
      },
      "25%": {
        opacity: 0,
        transform: "rotateY(0deg)",
      },
    },
    // "@keyframes blinker": {
    //   "0%, 10%, 25%, 40%, 55%, 70%, 85%, 100%": {
    //     opacity: 1,
    //     transform: "rotateY(0deg)",
    //   },
    //   "17.5%, 32.5%, 47.5%, 62.5%, 77.5%, 92.5%": {
    //     opacity: 1,
    //     transform: "rotateY(90deg)",
    //   },
    //   "5%": {
    //     opacity: 0,
    //     transform: "rotateY(0deg)",
    //   },
    // },
    root: {
      position: "fixed",
      left: "20px",
      bottom: "20px",
      zIndex: 5,
      width: "50px",
      height: "70px",
    },
    badgeImg: {
      width: "100%",
      height: "100%",
      animationName: "$blinker",
      animationDuration: "20s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },
  })
)

type Props = {
  subDomain?: string
}

const Badge = ({ subDomain }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a href="https://www.devicelist.ca/" target="_blank" rel="noreferrer">
        <img
          src={require(`../assets/${subDomain}/img/badge.png`).default}
          alt="badge-img"
          className={classes.badgeImg}
        />
      </a>
    </div>
  )
}

export default Badge

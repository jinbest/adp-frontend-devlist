import React from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    corner: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "35vw",
      minWidth: "400px",
      zIndex: -2,
      "& > img": {
        width: "100%",
      },
      ["@media (max-width:768px)"]: {
        top: 30,
        minWidth: "350px",
      },
      ["@media (max-width:500px)"]: {
        display: "none",
      },
    },
    skitImg: {
      position: "absolute",
      right: "15vw",
      top: "350px",
      width: "450px",
      zIndex: -1,
      "& img": {
        width: "100%",
      },
      ["@media (max-width:1600px)"]: {
        right: "7vw",
      },
      ["@media (max-width:1200px)"]: {
        right: "4vw",
        top: "290px",
        width: "400px",
      },
      ["@media (max-width:1000px)"]: {
        display: "none",
      },
    },
  })
)

type Props = {
  subDomain?: string
}

const Shape = ({ subDomain }: Props) => {
  const data = require(`../../assets/${subDomain}/Database`)
  const classes = useStyles()

  return (
    <div>
      <div className={classes.corner}>
        <img src={data.businessData.businessCornerShape} />
      </div>
      <div className={classes.skitImg}>
        <img src={require("../../assets/_common/mockData").locationsData.skitterMobile} />
      </div>
    </div>
  )
}

export default Shape
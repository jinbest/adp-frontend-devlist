import React from "react"
import { CardWhyCustomer } from "../../components"
import { Typography, Grid, Box } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"
import Rating from "@material-ui/lab/Rating"
import { createStyles, makeStyles } from "@material-ui/core/styles"

type Props = {
  subDomain?: string
}

const Section6 = ({ subDomain }: Props) => {
  const data = storesDetails.storeCnts
  const thisPage = data.homepage.section6
  const [t] = useTranslation()
  const classes = useStyles()
  const aveScore = 4.9,
    Score = 5,
    totalReviewes = 250

  return (
    <section className={subDomain + "-Container center " + subDomain + "-sec6-container"}>
      <Typography className="f40 bold mg-t-1 section-review-title">{t(thisPage.title)}</Typography>
      <Rating name="read-only" value={5} max={5} readOnly style={{ transform: "scale(1.2)" }} />
      <Typography className={classes.subTitle}>{`${aveScore} ${t("of")} ${Score} ${t(
        "stars"
      )}`}</Typography>
      <Typography className={classes.subContent}>{`${t("Based on")} ${totalReviewes}+ ${t(
        "Reviews"
      )}`}</Typography>
      <Grid container item xs={12} spacing={2} className={subDomain + "-sec6-card"}>
        {thisPage.reviews.map((item: any, index: number) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <Box className={subDomain + "-sec6-card"}>
                <CardWhyCustomer
                  key={index}
                  score={item.score}
                  days={item.day}
                  content={item.content}
                  reviewer={item.reviewer}
                  subDomain={subDomain}
                />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default Section6

const useStyles = makeStyles(() =>
  createStyles({
    subTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      ["@media (max-width:425px)"]: {
        fontSize: "3.5vw !important",
      },
    },
    subContent: {
      fontSize: "18px",
      ["@media (max-width:425px)"]: {
        fontSize: "3vw !important",
      },
    },
  })
)

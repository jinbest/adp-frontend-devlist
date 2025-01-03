import React from "react"
import { CardWhyCustomer } from "../../components"
import { Typography, Grid, Box } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { storesDetails } from "../../store"
import Rating from "@material-ui/lab/Rating"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { getBusinessLink } from "../../services/helper"

const Section6 = () => {
  const data = storesDetails.storeCnts
  const thisPage = data.homepage.section6
  const businessLink = getBusinessLink(storesDetails.allLocations)
  const [t] = useTranslation()
  const classes = useStyles()
  const overAllRating = thisPage.overAllRating

  return (
    <section className={"Container center sec6-container"}>
      <Typography className="section-review-title">{t(thisPage.title)}</Typography>
      {overAllRating.visible && (
        <>
          {businessLink ? (
            <a
              href={businessLink}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", width: "fit-content", color: "black" }}
            >
              <Rating
                name="read-only"
                value={5}
                max={5}
                readOnly
                style={{ transform: "scale(1.2)" }}
              />
              <Typography className={classes.subTitle}>{`${overAllRating.averScore} ${t("of")} ${
                overAllRating.score
              } ${t("stars")}`}</Typography>
              <Typography className={classes.subContent}>{`${t("Based on")} ${
                overAllRating.totalReviews
              }+ ${t("Reviews")}`}</Typography>
            </a>
          ) : (
            <>
              <Rating
                name="read-only"
                value={5}
                max={5}
                readOnly
                style={{ transform: "scale(1.2)" }}
              />
              <Typography className={classes.subTitle}>{`${overAllRating.averScore} ${t("of")} ${
                overAllRating.score
              } ${t("stars")}`}</Typography>
              <Typography className={classes.subContent}>{`${t("Based on")} ${
                overAllRating.totalReviews
              }+ ${t("Reviews")}`}</Typography>
            </>
          )}
        </>
      )}
      <Grid
        container
        item
        xs={12}
        spacing={2}
        className={"sec6-card"}
        style={{ maxWidth: "inherit" }}
      >
        {thisPage.reviews.map((item: any, index: number) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <Box className={"sec6-card"}>
                <CardWhyCustomer
                  key={index}
                  score={item.score}
                  days={item.day}
                  content={item.content}
                  reviewer={item.reviewer}
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

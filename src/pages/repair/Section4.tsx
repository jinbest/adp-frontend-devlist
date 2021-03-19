import React from "react"
import { Grid, Box, Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Button } from "../../components"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { isExternal } from "../../services/helper"
import { storesDetails } from "../../store"

type Props = {
  subDomain?: string
  handleStatus: (status: boolean) => void
}

const Section4 = ({ subDomain, handleStatus }: Props) => {
  const data = storesDetails.storeCnts
  const repair = data.repairData.section4
  const [t] = useTranslation()
  const classes = useStyles()

  return (
    <section className={subDomain + "-Container"}>
      <Grid
        container
        className={subDomain === "mobiletechlab" ? classes.mobileTechRoot : classes.root}
        spacing={2}
      >
        <Grid item xs={12} md={6} className={classes.item1}>
          <Typography
            className={subDomain + "-service-section-title-1"}
            style={{ color: repair.themeCol }}
          >
            {t(repair.title)}
          </Typography>
          <Typography
            className={subDomain + "-service-section-content"}
            style={{ color: repair.themeCol }}
          >
            {t(repair.content)}
          </Typography>
          <Box className={subDomain + "-service-section-button"}>
            {isExternal(repair.link) ? (
              <a
                href={repair.link}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  title={t(repair.btnTitle)}
                  bgcolor={data.colorPalle.repairButtonCol}
                  borderR="20px"
                  subDomain={subDomain}
                />
              </a>
            ) : (
              <Link
                to={repair.link}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  handleStatus(true)
                }}
              >
                <Button
                  title={t(repair.btnTitle)}
                  bgcolor={data.colorPalle.repairButtonCol}
                  borderR="20px"
                  subDomain={subDomain}
                />
              </Link>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.item2}>
          <img
            src={storesDetails.commonCnts.repairSec4Img}
            alt="repair-sec4-img"
            style={{ width: "100%", maxWidth: "700px" }}
          />
        </Grid>
      </Grid>
    </section>
  )
}

export default Section4

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      marginTop: "70px !important",
      display: "flex",
      [theme.breakpoints.up("md")]: {
        margin: "150px 0 !important",
        alignItems: "center",
        display: "flex",
        textAlign: "left",
      },
    },
    mobileTechRoot: {
      textAlign: "center",
      marginTop: "0px !important",
      display: "flex",
      [theme.breakpoints.up("md")]: {
        margin: "0 0 200px !important",
        alignItems: "center",
        display: "flex",
        textAlign: "left",
      },
      ["@media (max-width:425px)"]: {
        margin: "-250px 0 100px !important",
      },
    },
    item1: {
      order: 2,
      "& > div": {
        margin: "auto !important",
      },
      [theme.breakpoints.up("md")]: {
        order: 1,
        marginTop: "0px",
        "& > div": {
          margin: "inherit !important",
        },
      },
      marginTop: "50px",
    },
    item2: {
      order: 1,
      [theme.breakpoints.up("md")]: {
        order: 2,
      },
    },
  })
)

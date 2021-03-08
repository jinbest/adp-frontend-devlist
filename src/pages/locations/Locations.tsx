import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Shape } from "./"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Grid, Typography, Box } from "@material-ui/core"
import { Button } from "../../components"
import { useT, T } from "../../i18n"
import { Link } from "react-router-dom"
import { repairWidgetStore, storesDetails } from "../../store"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "1440px",
      margin: "250px auto 140px !important",
      padding: "0 2rem",
      display: "block",
      textAlign: "left",
      ["@media (max-width:1200px)"]: {
        marginTop: "210px !important",
      },
      ["@media (max-width:500px)"]: {
        margin: "180px auto 50px !important",
      },
      ["@media (max-width:425px)"]: {
        margin: "200px auto 100px !important",
      },
    },
    mainTitle: {
      color: "black",
      fontSize: "55px !important",
      lineHeight: "1 !important",
      textShadow: "1px 0 black",
      justifyContent: "center",
      // letterSpacing: "2px",
      ["@media (max-width:1400px)"]: {
        fontSize: "4vw !important",
        marginBottom: "3vw !important",
      },
      ["@media (max-width:768px)"]: {
        fontSize: "5vw !important",
      },
      ["@media (max-width:500px)"]: {
        fontSize: "5.5vw !important",
        width: "100%",
      },
    },
    mainContent: {
      color: "black",
      fontSize: "40px !important",
      marginBottom: "40px !important",
      justifyContent: "left",
      width: "80%",
      ["@media (max-width:1400px)"]: {
        fontSize: "2.5vw !important",
      },
      ["@media (max-width:768px)"]: {
        fontSize: "3vw !important",
      },
      ["@media (max-width:500px)"]: {
        fontSize: "3.5vw !important",
        width: "100%",
      },
    },
    locationsContainer: {
      marginTop: "200px",
    },
    item: {},
  })
)

type Props = {
  subDomain: string
  handleStatus: (status: boolean) => void
}

const Locations = ({ subDomain, handleStatus }: Props) => {
  const classes = useStyles()
  const data = require(`../../assets/${subDomain}/Database`)
  const t = useT()

  const [pageTitle, setPageTitle] = useState("Locations")

  useEffect(() => {
    setPageTitle(`Locations | ${storesDetails.storesDetails.name}`)
    handleStatus(false)
  }, [])

  const handleGetQuote = () => {
    const cntAppointment: any = repairWidgetStore.appointResponse
    repairWidgetStore.init()
    repairWidgetStore.changeAppointResponse(cntAppointment)
    handleStatus(false)
  }

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <Shape subDomain={subDomain} />
      <div className={classes.root}>
        <h1 className={classes.mainTitle}>{t("PROFESSIONAL") + ", " + t("TRANSPARENT") + " &"}</h1>
        <h1 className={classes.mainTitle}>{t("AFFORDABLE_DEVICE_REPAIR")}</h1>
        <Typography className={classes.mainContent}>
          {t("SAME_DAY_ADVANCED_REPAIR_SERVICES")}
        </Typography>
        <Box className={subDomain + "-service-section-button"} style={{ margin: "initial" }}>
          <Link to="/get-quote" style={{ textDecoration: "none" }} onClick={handleGetQuote}>
            <Button
              title={t("GET_QUOTE")}
              bgcolor={data.colorPalle.repairButtonCol}
              borderR="20px"
              subDomain={subDomain}
              width="70%"
              margin="0 auto 0 0"
            />
          </Link>
        </Box>
        <div className={classes.locationsContainer}>
          <Typography className={classes.mainContent}>
            <T id="ALL_DEVICELIST_LOCATIONS" data={storesDetails.storesDetails.name} />
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} className={classes.item}></Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Locations

import React from "react"
import { Grid, Typography, Box } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { storesDetails, repairWidgetStore } from "../../store"
import { Button } from "../../components"
import { isExternal } from "../../services/helper"
import { Link } from "react-router-dom"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import _ from "lodash"

type Props = {
  handleStatus: (status: boolean) => void
}

const SectionWave = ({ handleStatus }: Props) => {
  const data = storesDetails.storeCnts
  const thisPage = data.homepage.sectionWave
  const [t] = useTranslation()
  const classes = useStyles()
  const childData = _.sortBy(thisPage.data, (o) => o.order)

  const handleGetQuote = (link: string) => {
    if (link !== data.general.routes.repairWidgetPage) return
    const cntAppointment: any = repairWidgetStore.appointResponse
    repairWidgetStore.init()
    repairWidgetStore.changeAppointResponse(cntAppointment)
    handleStatus(false)
  }

  return (
    <div className={classes.root}>
      <img src={thisPage.bgImg} alt="section-wave-bg" width="1" height="auto" />
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{ display: "flex" }}>
            <div style={{ margin: "auto" }}>
              <h2 className={classes.mainTitle} style={{ marginTop: "0px !important" }}>
                {t(thisPage.title)}
              </h2>
              <div className={classes.buttonContainer}>
                {thisPage.buttons.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {item.visible && item.link && item.link !== "#" ? (
                        <Box className={"service-section-button"} style={{ margin: "initial" }}>
                          {isExternal(item.link) ? (
                            <a
                              href={item.link}
                              style={{ textDecoration: "none" }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button
                                title={t(item.title)}
                                bgcolor={data.general.colorPalle.repairButtonCol}
                                borderR="20px"
                                width="95%"
                              />
                            </a>
                          ) : (
                            <Link
                              to={item.link}
                              style={{ textDecoration: "none" }}
                              onClick={() => handleGetQuote(item.link)}
                            >
                              <Button
                                title={t(item.title)}
                                bgcolor={data.general.colorPalle.repairButtonCol}
                                borderR="20px"
                                width="95%"
                              />
                            </Link>
                          )}
                        </Box>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} container spacing={2}>
            {childData.map((item: any, index: number) => {
              return (
                <Grid item xs={12} sm={6} key={index}>
                  {item.visible && (
                    <div className={classes.item}>
                      <img
                        src={item.img}
                        alt={`sec-wave-img-${item.order}`}
                        width="1"
                        height="auto"
                      />
                      <Typography className={classes.subTitle}>{t(item.title)}</Typography>
                      <Typography className={classes.subContent}>{t(item.content)}</Typography>
                    </div>
                  )}
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default SectionWave

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      // marginTop: "-100px",
      height: "800px",
      "& > img": {
        position: "absolute",
        margin: "auto",
        top: 0,
        objectFit: "cover",
        zIndex: -2,
        width: "100%",
        minHeight: "900px",
        objectPosition: "center",
      },
      ["@media (max-width:1200px)"]: {
        height: "65vw",
        marginTop: "-150px",
      },
      ["@media (max-width:960px)"]: {
        height: "120vw",
      },
      ["@media (max-width:768px)"]: {
        height: "130vw",
        minHeight: "850px",
      },
      ["@media (max-width:600px)"]: {
        height: "280vw",
        marginTop: "-240px",
        "& > img": {
          objectPosition: "20%",
        },
      },
      ["@media (max-width:500px)"]: {
        height: "300vw",
      },
      ["@media (max-width:425px)"]: {
        height: "315vw",
        minHeight: "1150px",
        "& > img": {
          objectPosition: "30%",
        },
      },
    },
    container: {
      maxWidth: "1440px",
      display: "block !important",
      margin: "auto !important",
      padding: "300px 30px 0",
      ["@media (max-width:960px)"]: {
        padding: "350px 30px 0",
      },
    },
    mainTitle: {
      textAlign: "left",
      fontSize: "45px !important",
      fontWeight: 800,
      lineHeight: "115% !important",
      fontFamily: "Poppins Bold !important",
      padding: "30px 0 !important",
      margin: "0 auto !important",
      ["@media (max-width:1200px)"]: {
        fontSize: "3.5vw !important",
      },
      ["@media (max-width:960px)"]: {
        textAlign: "center",
      },
      ["@media (max-width:768px)"]: {
        fontSize: "4.5vw !important",
      },
      ["@media (max-width:600px)"]: {
        fontSize: "6vw !important",
      },
      ["@media (max-width:425px)"]: {
        fontSize: "5vw !important",
      },
    },
    buttonContainer: {
      display: "flex",
      ["@media (max-width:960px)"]: {
        textAlign: "center !important",
        margin: "auto !important",
        alignItems: "center !important",
        justifyContent: "center !important",
      },
    },
    item: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > img": {
        width: "90%",
        marginBottom: "5px",
      },
      ["@media (max-width:600px)"]: {
        "& > img": {
          width: "70%",
          marginBottom: "5px",
        },
      },
    },
    subTitle: {
      fontFamily: "Poppins Bold !important",
      fontSize: "22px !important",
      textAlign: "center",
      whiteSpace: "nowrap",
      ["@media (max-width:1200px)"]: {
        fontSize: "1.5vw !important",
      },
      ["@media (max-width:960px)"]: {
        fontSize: "2.5vw !important",
      },
      ["@media (max-width:600px)"]: {
        fontSize: "4vw !important",
      },
    },
    subContent: {
      fontSize: "18px !important",
      textAlign: "center",
      ["@media (max-width:1200px)"]: {
        fontSize: "1.3vw !important",
      },
      ["@media (max-width:960px)"]: {
        fontSize: "2vw !important",
      },
      ["@media (max-width:600px)"]: {
        fontSize: "3.5vw !important",
      },
    },
  })
)

import React, { useEffect, useState } from "react"
import { storesDetails } from "../../store"
import { Helmet } from "react-helmet"
import { Shape, ContactModal } from "./"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import { Button } from "../../components"
import { useTranslation } from "react-i18next"
import { Card } from "../repair/widget-component"
import {
  ShippingLabel,
  CustomerService,
  FreeShipping,
  Pay,
  QuickTurnaround,
  Soldering,
} from "./SVGs"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "1440px",
      margin: "250px auto 140px !important",
      padding: "0 2rem",
      display: "block",
      textAlign: "center",
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
    cardContainer: {
      margin: "100px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ["@media (max-width:600px)"]: {
        margin: "50px auto -20px",
      },
    },
    card: {
      padding: "50px 30px",
      height: "auto",
      maxWidth: "1200px !important",
      ["@media (max-width:600px)"]: {
        padding: "40px 20px",
      },
    },
    mainTitle: {
      color: "black",
      fontSize: "60px !important",
      marginBottom: "40px !important",
      // textShadow: "1px 0 black",
      fontWeight: "bold",
      justifyContent: "center",
      letterSpacing: "2px",
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
      justifyContent: "center",
      width: "80%",
      margin: "auto",
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
    subTitle: {
      fontSize: "40px !important",
      textAlign: "center",
      color: "black",
      // textShadow: "1px 0 black",
      fontWeight: "bold",
      letterSpacing: "1px",
      marginBottom: "50px",
      ["@media (max-width:1400px)"]: {
        fontSize: "3vw !important",
        marginBottom: "3vw !important",
      },
      ["@media (max-width:960px)"]: {
        marginBottom: "50px !important",
      },
      ["@media (max-width:768px)"]: {
        fontSize: "3.5vw !important",
      },
      ["@media (max-width:500px)"]: {
        fontSize: "4vw !important",
        width: "100%",
      },
    },
    item: {
      display: "flex",
      ["@media (max-width:500px)"]: {
        padding: "8px !important",
      },
    },
    SVGContainer: {
      width: "90px",
      height: "90px",
      boxShadow: "-10px -10px 30px #FFFFFF, 10px 10px 30px rgba(174, 174, 192, 0.4)",
      borderRadius: "90px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      height: "90px",
      width: "100%",
      marginLeft: "20px",
      border: "1px solid #BDBFC3",
      borderRadius: "20px",
      textAlign: "left",
      alignItems: "center",
      display: "flex",
      ["@media (max-width:500px)"]: {
        marginLeft: "10px",
      },
    },
    itemText: {
      fontSize: "18px !important",
      padding: "0 20px",
      ["@media (max-width:1400px)"]: {
        fontSize: "16px !important",
      },
      ["@media (max-width:500px)"]: {
        fontSize: "3vw !important",
        width: "100%",
        padding: "0 10px",
      },
    },
  })
)

type Props = {
  subDomain: string
  handleStatus: (status: boolean) => void
}

const Business = ({ subDomain, handleStatus }: Props) => {
  const classes = useStyles()
  const data = require(`../../assets/${subDomain}/Database`)
  const [t] = useTranslation()

  const [pageTitle, setPageTitle] = useState("Business Solutions | ")
  const [metaDescription, setMetaDescription] = useState("")
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const storeTabData = data.getTabData(storesDetails.storesDetails.name)

    setPageTitle(storeTabData.businessTitle)
    setMetaDescription(storeTabData.businessMetaDes)

    handleStatus(true)
  }, [])

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" id="favicon" href={data.fav.img} />
        <link rel="apple-touch-icon" href={data.fav.img} />
      </Helmet>

      <Shape subDomain={subDomain} />
      <div className={classes.root}>
        <h1 className={classes.mainTitle}>{t("Business Solutions")}</h1>
        <Typography className={classes.mainContent}>
          {t(
            "We provide reliable device management and repair services so you can focus on running your business."
          )}
        </Typography>
        <Button
          title={t("Get Started")}
          bgcolor={data.colorPalle.repairButtonCol}
          borderR="20px"
          subDomain={subDomain}
          width="200px"
          margin="auto"
          onClick={() => setOpenModal(true)}
        />
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <Typography className={classes.subTitle}>{t("Why Businesses Choose Us?")}</Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 20px" }}>
                    <FreeShipping color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>
                    {t("Free shipping and bulk discounts for 5+ devices.")}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 24px" }}>
                    <Pay color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>
                    {t("Flexible payement options. You choose how and when you pay.")}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 25px" }}>
                    <ShippingLabel color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>
                    {t("Instant shipping label upon request.")}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 22px" }}>
                    <Soldering color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>
                    {t("Dedicated B2B microsoldering Techs.")}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 22px" }}>
                    <CustomerService color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>
                    {t("Responsive customer support.")}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 20px" }}>
                    <QuickTurnaround color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>{t("Quick turnaround.")}</Typography>
                </div>
              </Grid>
            </Grid>
          </Card>
          <ContactModal
            openModal={openModal}
            handleModal={setOpenModal}
            subDomain={subDomain}
            storesDetailsStore={storesDetails}
          />
        </div>
      </div>
    </div>
  )
}

export default Business

import React, { useEffect, useState } from "react"
import { storesDetails } from "../../store"
import { Helmet } from "react-helmet"
import { Shape } from "./"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import { Button } from "../../components"
import { useT } from "../../i18n"
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
      ["@media (max-width:768px)"]: {
        marginTop: "210px !important",
      },
      ["@media (max-width:500px)"]: {
        marginTop: "180px !important",
      },
      ["@media (max-width:425px)"]: {
        marginTop: "200px !important",
      },
    },
    cardContainer: {
      margin: "100px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
      textShadow: "1px 0 black",
      justifyContent: "center",
      letterSpacing: "2px",
    },
    mainContent: {
      color: "black",
      fontSize: "40px !important",
      marginBottom: "40px !important",
      justifyContent: "center",
    },
    subTitle: {
      fontSize: "40px !important",
      textAlign: "center",
      color: "black",
      textShadow: "1px 0 black",
      fontWeight: "bold",
      letterSpacing: "1px",
      marginBottom: "50px",
    },
    item: {
      display: "flex",
      // paddingRight: "40px !important",
      // [theme.breakpoints.down("md")]: {
      //   paddingRight: "8px !important",
      // },
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
    },
    itemText: {
      fontSize: "18px !important",
      padding: "0 20px",
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
  const t = useT()

  const [pageTitle, setPageTitle] = useState("Business")

  useEffect(() => {
    setPageTitle(`Business | ${storesDetails.storesDetails.name}`)
    handleStatus(true)
  }, [])

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <Shape subDomain={subDomain} />
      <div className={classes.root}>
        <h1 className={classes.mainTitle}>Business Solutions</h1>
        <Typography className={classes.mainContent}>
          We provide reliable device management and repair services so you can focus on running your
          business.
        </Typography>
        <Button
          title={t("GET_QUOTE")}
          bgcolor={data.colorPalle.repairButtonCol}
          borderR="20px"
          subDomain={subDomain}
          width="200px"
          margin="auto"
        />
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <Typography className={classes.subTitle}>Why Businesses Choose Us?</Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 20px" }}>
                    <FreeShipping color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>
                    Free shipping and bulk discounts for 5+ devices
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
                    Flexible payement options. You choose how and when you pay.
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
                    Instant shipping label upon request
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
                    Dedicated B2B microsoldering Techs
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
                  <Typography className={classes.itemText}>Responsive customer support</Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.item}>
                <div className={classes.SVGContainer}>
                  <div style={{ padding: "0 20px" }}>
                    <QuickTurnaround color={data.colorPalle.repairButtonCol} />
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <Typography className={classes.itemText}>Quick turnaround</Typography>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Business
